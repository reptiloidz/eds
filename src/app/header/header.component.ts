import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService';
import { AccountService } from '../services/account.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    user: any;
    constructor(
        public authService: AuthService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.user = this.accountService.user$.getValue();
        console.log(this.user);
    }

    logOut() {
        this.authService.logout();
    }
}
