import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment, User } from '../shared/interface';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent {
    @Input() comment: Comment;
    @Input() user: User | null;

    @Output() deleteHandler = new EventEmitter();
    @Output() editHandler = new EventEmitter();

    onDelete() {
        this.deleteHandler.emit();
    }

    onEdit() {
        this.editHandler.emit();
    }
}
