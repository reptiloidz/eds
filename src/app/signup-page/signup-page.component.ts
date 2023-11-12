import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { passwordMismatchValidator } from '../shared/validators';
import { User } from '../shared/interface';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { passValidator } from '../shared/validators/passValidator';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
    form: FormGroup;
    loading = false;
    error: string | null = null;
    names: Array<any>;
    nameExist = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private accountService: AccountService,
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            name: new FormControl('', [Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                passValidator()
            ]),
            confirmPass: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ])
            },
            {
                validators: passwordMismatchValidator
            }
        );

        this.authService.getNames().subscribe(
            response => this.names = response
        );
    }

    submit() {
        const user: User = {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        this.error = null;
        this.loading = true;

        this.authService.signup(user).subscribe({
            next: response => {
                const newUser: User = {
                    idToken: response.idToken,
                    displayName: this.form.controls['name'].value
                }

                this.authService.addNewName({displayName: this.form.controls['name'].value})
                    .subscribe();

                this.accountService.updateProfile(newUser).subscribe({
                    next: () => {
                        this.form.reset();
                        this.loading = false;
                        this.router.navigate(['/']);
                    },
                    error: error => {
                        console.log(error);
                        this.loading = false;
                    }
                });
            },
            error: error => {
                if(error.error.error.message === 'EMAIL_EXISTS') {
                    this.error = 'User with this email already exists';
                }

                this.loading = false;
            }
        });
    }

    checkAvailableName() {
        const inputName = this.form.controls['name'].value;
        this.nameExist = false;

        Object.values(this.names).find(item => {
            if (item['displayName'] === inputName) {
                this.nameExist = true;
            }
        });
    }
}
