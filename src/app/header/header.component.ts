import { Component } from '@angular/core';
import { AuthService } from '../services/authService';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        public authService: AuthService
    ) {}

    logOut() {
        this.authService.logout();
    }
}
