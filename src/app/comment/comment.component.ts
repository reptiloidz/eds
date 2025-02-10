import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, OnInit, HostBinding } from '@angular/core';
import { Comment, User, Reply } from '../shared/interface';
import * as uniqid from 'uniqid';
import { PostService } from '../services/posts.service';
import { RepliesSorting } from '../services/posts.enum';

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

    @HostBinding('class') class = 'comment';

    commentForm: FormGroup;
    replyForm: FormGroup;
    canEdit = false;
    popupIsOpen = false;
    replyFormVisible = false;
    replies: Array<Reply>

    constructor(
        private postService: PostService,
    ) {}

    ngOnInit() {
        this.commentForm = new FormGroup({
            comment: new FormControl()
        });

        this.postService.getReplies(RepliesSorting.byCommentId, this.comment.id).then(data => {
            if (data.val()) {
                this.replies = Object.values(data.val());
            }
        })
    }

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

    toggleReply() {
        this.replyFormVisible = !this.replyFormVisible;

        this.replyForm = new FormGroup({
            replyControl: new FormControl('', [Validators.required])
        });
    }

    sendReply() {
        if(this.user) {
            const data: Reply = {
                author: {
                    displayName: this.user.displayName,
                    uid: this.user.uid,
                    providerId: this.user.providerId,
                    email: this.user.email,
                    phoneNumber: this.user.phoneNumber,
                    photoURL: this.user.photoURL
                },
                id: uniqid(),
                comment_id: this.comment.id,
                text: this.replyForm.controls['replyControl'].value,
                date: + new Date(),
                is_read: false,
            }
            this.replyHandler.emit(data);
        }
    }
}
