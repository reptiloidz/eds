import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { AccountService } from '../services/account.service';
import { User, Users } from '../shared/interface';
import { distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    user: User | null = null;

    constructor(
        public authService: AuthService,
        private accountService: AccountService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.authService.authorized$.pipe(
            distinctUntilChanged()
        ).subscribe(
            value => {
                if (value) {
                    this.accountService.getProfile({'idToken': localStorage.getItem('fb-token')}).subscribe({
                        next: response => {
                            this.accountService.user$.next((response as Users).users[0]);
                        },
                        error: error => {
                            console.log(error);
                        }
                    });
                } else {
                    this.accountService.user$.next(null);
                }
            }
        );

        this.accountService.user$.pipe(
            distinctUntilChanged()
        ).subscribe(
            user => this.user = user
        );
    }

    logOut() {
        this.authService.logout();
        this.router.navigate(['']);
    }

    getPictureByDate(date: Date) {
        const dateMonth = date.getMonth() + 1;
        let month = '';

        if (dateMonth > 0 && dateMonth < 10) {
            month = `0${dateMonth}`;
        } else {
            month = dateMonth.toString();
        }

        const dateString = `${date.getFullYear()}-${month}-${date.getDate()}`;
        this.router.navigate([`day/${dateString}`]);
    }
}
