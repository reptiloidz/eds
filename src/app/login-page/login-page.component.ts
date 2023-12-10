import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
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
    loginForm: FormGroup;
    resetForm: FormGroup;
    error: HttpErrorResponse;
    errorMessage: string = '';
    subscription: Subscription;
    isOpen: boolean = false;
    resetFormIsSended: boolean = false;
    resetError: Error | null;

    @HostBinding('class') class = 'd-flex flex-center h-100p';

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                passValidator()
            ])
        });

        this.resetForm = new FormGroup({
            resetEmail: new FormControl('', [Validators.required, Validators.email])
        });
    }

    ngOnDestroy(): void {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    submit() {

        const user: User = {
            email: this.loginForm.controls['email'].value,
            password: this.loginForm.controls['password'].value
        }

        this.subscription = this.authService.login(user).subscribe({
            next: () => {
                this.loginForm.reset();
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

    togglePassReset() {
        this.isOpen = !this.isOpen;
        this.resetForm.reset();
    }



    submitReset() {
        const user: Pick<User, 'email'> = {
            email: this.resetForm.controls['resetEmail'].value
        }

        this.authService.resetPass(user).subscribe({
            next: () => {
                this.resetFormIsSended = true;
                this.resetError = null;
                this.resetForm.reset();

                setTimeout(() => {
                    this.resetFormIsSended = !this.resetFormIsSended;
                }, 10000);
            },
            error: err => {
                if (err.error.error.message === 'EMAIL_NOT_FOUND') {
                    this.resetError = err;

                    setTimeout(() => {
                        this.resetError = null;
                    }, 5000);
                }
            }
        });
    }
}
