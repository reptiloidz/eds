import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interface';
import { distinctUntilChanged } from 'rxjs';

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
        this.authService.test().subscribe(()=> {
            distinctUntilChanged();
            this.user = this.authService.user;
        });

        this.authService.test2();

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
