import { User } from './../shared/interface';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { passwordMismatchValidator } from '../shared/validators';
import { Router } from '@angular/router';
import { passValidator } from '../shared/validators/passValidator';
import { usernameValidator } from '../shared/validators/usernameValidator';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html',
})
export class SignupPageComponent implements OnInit {
    form: FormGroup;
    loading = false;
    error: string | null = null;
    nameExist = false;

    @HostBinding('class') class = 'd-flex flex-column flex-center h-100p';

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup(
            {
                email: new FormControl('', [
                    Validators.required,
                    Validators.email,
                ]),
                name: new FormControl('', [
                    Validators.required,
                    Validators.maxLength(30),
                    Validators.minLength(3),
                    usernameValidator(),
                ]),
                password: new FormControl('', [
                    Validators.required,
                    Validators.minLength(6),
                    passValidator(),
                ]),
                confirmPass: new FormControl('', [
                    Validators.required,
                    Validators.minLength(6),
                ]),
            },
            {
                validators: passwordMismatchValidator,
            },
        );
    }

    submit() {
        const email = this.form.controls['email'].value;
        const password = this.form.controls['password'].value;
        const displayName = this.form.controls['name'].value;

        this.error = null;
        this.loading = true;

        this.authService.getName('displayName', displayName).then(
            response => {
                if (response.val()) {
                    Object.values(response.val()).forEach(item => {
                        if ((item as User).displayName === displayName) {
                            this.nameExist = true;
                            this.loading = false;
                        }
                    });
                } else {
                    this.authService.signup(email, password, displayName).then(
                        () => {
                            this.authService.addNewName({
                                displayName: displayName,
                            });
                            this.form.reset();
                            this.loading = false;
                            this.router.navigate(['/']);
                        },
                        error => {
                            if (error.code === 'auth/email-already-in-use') {
                                this.error =
                                    'User with this email already exists';
                            } else {
                                this.error = error.message;
                            }
                            this.loading = false;
                        },
                    );
                }
            },
            error => {
                this.error = error;
                this.loading = false;
                console.log(error);
            },
        );
    }

    loginWithGoogle() {
        this.authService
            .signUpWithGoogle()
            .then(() => this.router.navigate(['/']));
    }
}
