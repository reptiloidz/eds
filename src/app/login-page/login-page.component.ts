import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { User } from '../shared/interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { passValidator } from '../shared/validators/passValidator';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    error: HttpErrorResponse;
    errorMessage: string = '';
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                passValidator()
            ])
        })
    }

    ngOnDestroy(): void {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    submit() {

        const user: User = {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        this.subscription = this.authService.login(user).subscribe({
            next: () => {
                this.form.reset();
                this.router.navigate(['/']);
            },
            error: error => {
                this.error = error;

                if(error.status === 400) {
                    this.errorMessage = 'Wrong email or password'
                } else {
                    this.errorMessage = 'We are sorry. Try later...'
                }
            }
        });
    }
}
