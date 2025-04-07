import { Component, HostBinding } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})
export class FooterComponent {
    @HostBinding('class') class = 'footer';

    _user: User | null = null;

    constructor(public authService: AuthService) {}

    get user() {
        return (this._user = this.authService.user);
    }
}
