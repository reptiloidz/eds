import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Comment, User } from '../shared/interface';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    @Input() user: User | null;

    @Output() deleteHandler = new EventEmitter();
    @Output() editHandler = new EventEmitter();

    form: FormGroup;
    canEdit = false;
    popupIsOpen = false;

    ngOnInit() {
        this.form = new FormGroup({
            comment: new FormControl()
        });
    }

    onDelete() {
        this.deleteHandler.emit(this.comment);
    }

    onEdit() {
        const data = {
            comment: this.comment,
            newText: this.form.controls['comment'].value
        };

        this.editHandler.emit(data);
        this.canEdit = !this.canEdit;
    }

    editSwitch() {
        this.canEdit = !this.canEdit;
    }

    togglePopup() {
        this.popupIsOpen = !this.popupIsOpen;
    }
}
