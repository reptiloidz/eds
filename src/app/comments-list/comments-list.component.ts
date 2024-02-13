import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Comment, CommentsNames, DailySpacePicture, User } from '../shared/interface';
import { PostService } from '../services/posts.service';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';
import * as uniqid from 'uniqid';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html'
})

export class CommentsListComponent implements OnInit, OnDestroy {
    @Input() comments: Array<any>;
    @Input() picture: DailySpacePicture | undefined;
    @Input() commentsNames: CommentsNames;
    @Output() onChange = new EventEmitter();

    subscribes: Subscription;
    commentInput: FormControl | any;
    comment: Comment;
    user: User | null;

    constructor(
        public authService: AuthService,
        private postService: PostService,
        private accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.commentInput = new FormControl('', Validators.required);
        this.subscribes = this.accountService.user$.subscribe(
            user => this.user = user
        );
    }

    ngOnDestroy(): void {
        this.subscribes.unsubscribe();
    }

    post() {
        this.comment = {
            date: + new Date(),
            pictureDate: this.picture?.date,
            author: this.user?.displayName,
            text: this.commentInput.value,
            id: uniqid(),
        };

        const postSubscribe = this.postService.addNewPost(this.comment).subscribe({
            next: () => {
                this.commentInput.reset();
                this.onChange.emit();
            },
            error: error => console.log(error)
        });

        this.subscribes.add(postSubscribe);
    }

    delete(comment: Comment) {
        const post = Object.entries(this.commentsNames).find(
            item => item[1].id === comment.id
        );

        if (post) {
            const delSubscribe = this.postService.delPost(post[0]).subscribe({
                next: () => this.onChange.emit()
            });
            this.subscribes.add(delSubscribe);
        }
    }

    // edit(comment: Comment) {

    // }
}
