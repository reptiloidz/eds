import { Component } from '@angular/core';
import { AuthService } from '../services/authService';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html'
})

export class CommentsComponent {
    constructor(
        public authService: AuthService
    ) {}
}
