import { Subscription } from 'rxjs';
import { User } from '../shared/interface';
import { AccountService } from './../services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { passValidator } from '../shared/validators/passValidator';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit, OnDestroy {
    subscribes!: Subscription;
    user: User | null = null;
    newUserData: User | null = null;
    idToken: string | null = null;
    popup = false;

    name = new FormControl({value: '', disabled: true}, [Validators.required]);
    email = new FormControl({value: '', disabled: true}, [Validators.required, Validators.email]);
    pass = new FormControl({value: '', disabled: true}, [
        Validators.required,
        Validators.minLength(6),
        passValidator()
    ]);

    constructor(
        private accountService: AccountService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.subscribes = this.accountService.user$.subscribe(
            user => this.user = user
        );
    }

    ngOnDestroy(): void {
        this.subscribes.unsubscribe();
    }

    cancelEdit() {
        this.name.disable();
        this.email.disable();
        this.pass.disable();

        this.name.reset();
        this.email.reset();
        this.pass.reset();
    }

    enableNameInput() {
        this.name.enable();
    }

    changeName() {
        const newName: User = {
            idToken: localStorage.getItem('fb-token'),
            displayName: this.name.value
        }

        const changeNameSubscribe = this.accountService.updateProfile(newName).subscribe({
            next: response => {
                this.user = response;
                this.name.disable();
            },
            error: error => {
                console.log(error);
            }
        });

        this.subscribes.add(changeNameSubscribe);
    }

    enableEmailInput() {
        this.email.enable();
    }

    changeEmail() {
        const newEmail: User = {
            idToken: localStorage.getItem('fb-token'),
            email: this.email.value
        }

        const changeEmailSub = this.accountService.updateEmail(newEmail).subscribe({
            next: response => {
                this.user = response;
                this.email.disable();
            },
            error: error => console.log(error)
        });

        this.subscribes.add(changeEmailSub);
    }

    enablePassInput() {
        this.pass.enable();
    }

    changePass() {
        const newPass: User = {
            idToken: localStorage.getItem('fb-token'),
            password: this.pass.value
        }

        const changePassSub = this.accountService.updatePass(newPass).subscribe({
            next: () => {
                this.pass.disable();
                this.pass.reset();
                this.authService.logout();
                this.router.navigate(['/login']);
            },
            error: error => {
                if(error.error.error.message === 'TOKEN_EXPIRED') {
                    this.user = null;
                    this.router.navigate(['/login']);
                }
            }
        });

        this.subscribes.add(changePassSub);
    }

    switchPopup() {
        this.popup = !this.popup;
    }

    delProfile() {
        const user: User = {
            idToken: localStorage.getItem('fb-token')
        }

        const getNames = this.authService.getNames().subscribe(
            result => Object.entries(result).forEach(([key, value]) => {
                if ((value as User).displayName === this.user?.displayName) {
                    this.authService.deleteName(key).subscribe()
                }
            })
        );

        const delAccount = this.accountService.deleteAccount(user).subscribe(
            () => {
                this.authService.logout();
                this.router.navigate(['']);
            }
        );

        this.subscribes.add(getNames);
        this.subscribes.add(delAccount);
    }
}
