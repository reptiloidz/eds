import { User } from '../shared/interface';
import { AccountService } from './../services/account.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {
    user: User | null;

    constructor(
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.accountService.user$.subscribe(
            user => this.user = user
        );
    }
}
