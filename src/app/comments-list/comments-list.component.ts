import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Comment, CommentsNames, DailySpacePicture, User } from '../shared/interface';
import { PostService } from '../services/posts.service';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';

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

        console.log(this.commentsNames);
    }

    ngOnDestroy(): void {
        this.subscribes.unsubscribe();
    }

    post() {
        this.comment = {
            date: + new Date(),
            pictureDate: this.picture?.date,
            author: this.user?.displayName,
            text: this.commentInput.value
        }

        const postSubscribe = this.postService.addNewPost(this.comment).subscribe({
            next: result => {
                this.commentInput.reset();
                this.onChange.emit();
                console.log(result.name);
            },
            error: error => console.log(error)
        });

        this.subscribes.add(postSubscribe);
    }

    delete(comment: Comment) {
        const name = Object.entries(this.commentsNames).find(
            item => item[1].date === comment.date
        );

        if (name) {
            const delSubscribe = this.postService.delPost(name[0]).subscribe({
                next: () => this.onChange.emit()
            });
            this.subscribes.add(delSubscribe);
        }
    }
}
