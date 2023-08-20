import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/authService';
import { Comment, DailySpacePicture } from '../shared/interface';
import { PostService } from '../services/posts.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-comments-list',
    templateUrl: './comments-list.component.html'
})

export class CommentsListComponent implements OnInit {
    @Input() comments: Array<any>;
    @Input() picture: DailySpacePicture | undefined;
    @Output() onPush = new EventEmitter();

    commentInput: FormControl | any;
    comment: Comment;

    constructor(
        public authService: AuthService,
        private postService: PostService
    ) {}

    ngOnInit(): void {
        this.commentInput = new FormControl('', Validators.required);
    }

    post() {
        this.comment = {
            date: + new Date(),
            pictureDate: this.picture?.date,
            author: '',
            text: this.commentInput.value
        }

        this.postService.addNewPost(this.comment).subscribe({
            next: result => {
                this.commentInput.reset();
                this.onPush.emit();
            },
            error: error => console.log(error)
        });
    }
}
