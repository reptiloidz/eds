import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interface';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    user: User | null = null;

    constructor(
        public authService: AuthService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.authService.authState().then(() => {
            this.user = this.authService.user;
        });
        console.log(this.user, 'from header');

        console.log(this.authService.anticipated$.getValue());
    }

    logOut() {
        this.authService.logout();
        this.router.navigate(['']);
        this.user = null;
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
