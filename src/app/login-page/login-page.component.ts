import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/authService';
import { User } from '../shared/interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;
    error: HttpErrorResponse;
    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]+$/)
            ])
        })
    }

    submit() {

        const user: User = {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        this.authService.login(user).subscribe({
            next: response => {
                this.form.reset();
                this.router.navigate(['/']);
            },
            error: error => {
                this.error = error;
                console.log(this.error);

                if(error.status === 400) {
                    this.errorMessage = 'Wrong email or password'
                } else {
                    this.errorMessage = 'We are sorry. Try later...'
                }
            }
        });
    }
}
