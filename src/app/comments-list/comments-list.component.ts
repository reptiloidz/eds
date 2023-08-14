import { Component } from '@angular/core';
import { AuthService } from '../services/authService';
import { Comment } from '../shared/interface';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html'
})

export class CommentsListComponent {
    comments: Array<Comment> = [
        {
            date: new Date(),
            author: 'Pupa',
            text: 'Wow awesome'
        },
        {
            date: new Date(),
            author: 'Lupa',
            text: 'Meh'
        },
        {
            date: new Date(),
            author: 'Popa',
            text: 'Looks like your mom'
        }
    ];

    constructor(
        public authService: AuthService
    ) {}
}
