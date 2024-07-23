import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    _user: User | null = null;

    constructor(
        public authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        this._user = this.authService.user;
    }

    get user() {
        return this._user = this.authService.user;
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
