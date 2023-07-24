import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { Subscriber } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    constructor(
        private router: Router,
        public authService: AuthService
    ) {}

    ngOnInit(): void {
        // this.authorized = this.authService.idAuthenticated();
    }

    loginPage() {
        this.router.navigate(['/login']);
    }

    signUpPage() {
        this.router.navigate(['/signup']);
    }

    homePage() {
        this.router.navigate(['']);
    }

    logOut() {
        this.authService.logout();
    }
}
