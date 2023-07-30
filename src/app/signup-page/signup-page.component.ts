import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { passwordMismatchValidator } from '../shared/validators';
import { DbUser, User } from '../shared/interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from '../services/profile.service';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    signupSubscribe: Subscription;
    newUserSubscribe: Subscription;
    loading = false;
    error: string | null = null;

    constructor(
        private authService: AuthService,
        private router: Router,
        private profileService: ProfileService
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            name: new FormControl('', [Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
            ]),
            confirmPass: new FormControl('', [
                Validators.required,
                Validators.minLength(6)
            ])
        },
        {
            validators: passwordMismatchValidator
        })
    }

    ngOnDestroy(): void {
        if(this.signupSubscribe) {
            this.signupSubscribe.unsubscribe();
        }
    }

    submit() {
        const user: User = {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        this.error = null;
        this.loading = true;

        this.signupSubscribe = this.authService.signup(user).subscribe({
            next: response => {
                this.form.reset();
                this.router.navigate(['/']);
                this.loading = false;

                console.log(response);
                // const newUser: DbUser = {
                //     id: response.localId,
                //     email: this.form.controls['email'].value,
                //     name: this.form.controls['name'].value
                // }

                // this.newUserSubscribe = this.profileService.newUser(newUser).subscribe({
                //     next: response => {
                //         console.log(response);
                //     },
                //     error: error => {
                //         console.log(error);
                //         this.loading = false;
                //     }
                // });
            },
            error: error => {
                if(error.error.error.message === 'EMAIL_EXISTS') {
                    this.error = 'User with this email already exists';
                }

                this.loading = false;
            }
        });

    }
}
