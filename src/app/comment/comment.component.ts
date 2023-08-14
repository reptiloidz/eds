import { Component, Input } from '@angular/core';
import { Comment } from '../shared/interface';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent {
    @Input('comment') comment: Comment;
}
