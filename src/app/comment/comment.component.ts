import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    @Output() replyHandler = new EventEmitter();

    commentForm: FormGroup;
    replyForm: FormGroup;
    canEdit = false;
    popupIsOpen = false;
    replyFormVisible = false;

    ngOnInit() {
        this.commentForm = new FormGroup({
            comment: new FormControl()
        });
    }

    //#region Edit methods

    onDelete() {
        this.deleteHandler.emit(this.comment);
    }

    onEdit() {
        const data = {
            comment: this.comment,
            newText: this.commentForm.controls['comment'].value
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

    //#region Reply methods

    toggleReply() {
        this.replyFormVisible = !this.replyFormVisible;

        this.replyForm = new FormGroup({
            replyControl: new FormControl('', [Validators.required])
        });
    }

    sendReply() {
        const data = {
            comment: this.comment,
            reply: this.replyForm.controls['replyControl'].value,
            replyAuthor: this.user?.displayName,
        }

        this.replyHandler.emit(data);
    }
}
