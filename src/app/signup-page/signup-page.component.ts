import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { passwordMismatchValidator } from '../shared/validators';
import { User } from '../shared/interface';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { passValidator } from '../shared/validators/passValidator';
import { usernameValidator } from '../shared/validators/usernameValidator';
import { UserCredential } from "@angular/fire/auth"

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

    @HostBinding('class') class = 'd-flex flex-column flex-center h-100p';

    constructor(
        private authService: AuthService,
        private router: Router,
        private accountService: AccountService,
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            name: new FormControl('', [
                Validators.required,
                Validators.maxLength(30),
                Validators.minLength(3),
                usernameValidator()
            ]),
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

        this.authService.getNames().then(
            response => this.names = response as any
        );
    }

    submit() {
        const user: User = {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
        }

        this.error = null;
        this.loading = true;

        this.authService.signup(user).then( (response) => {

            console.log(response);
            // console.log(response.user.getIdTokenResult());

            // if (response) {
            //     const newUser: User = {
            //         idToken: response.user.accessToken,
            //         displayName: this.form.controls['name'].value
            //     }

            //     this.authService.addNewName({displayName: this.form.controls['name'].value});

            //     this.accountService.updateProfile(newUser).subscribe({
            //         next: () => {
            //             this.form.reset();
            //             this.loading = false;
            //             this.router.navigate(['/']);
            //         },
            //         error: error => {
            //             console.log(error);
            //             this.loading = false;
            //         }
            //     });
            // }
        })

        // this.authService.signup(user).subscribe({
        //     next: response => {
        //         const newUser: User = {
        //             idToken: response.idToken,
        //             displayName: this.form.controls['name'].value
        //         }

        //         this.authService.addNewName({displayName: this.form.controls['name'].value});

        //         this.accountService.updateProfile(newUser).subscribe({
        //             next: () => {
        //                 this.form.reset();
        //                 this.loading = false;
        //                 this.router.navigate(['/']);
        //             },
        //             error: error => {
        //                 console.log(error);
        //                 this.loading = false;
        //             }
        //         });
        //     },
        //     error: error => {
        //         if(error.error.error.message === 'EMAIL_EXISTS') {
        //             this.error = 'User with this email already exists';
        //         }

        //         this.loading = false;
        //     }
        // });
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
