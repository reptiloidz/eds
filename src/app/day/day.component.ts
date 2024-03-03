import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsNames, DailySpacePicture } from '../shared/interface';
import { PostService } from '../services/posts.service';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
})
export class DayComponent implements OnInit {
    item: DailySpacePicture;
    comments: Array<Comment> | Array<undefined>;
    commentsNames: CommentsNames;
    error: Error | undefined = undefined;
    date: string | undefined = undefined;
    prev: string = '';
    next: string = '';
    isLast: boolean = false;
    loading = true;


    constructor(
        private activatedRoute: ActivatedRoute,
        private postService: PostService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe({
            next: data => {
                this.item = data['day'];
                this.getComments(this.item.date);
                this.calculateDates();
                this.loading = false;

            },
            error: error => console.log(error)
        });
    }

    getComments(pictureDate: string): void {
        this.postService.getPosts(pictureDate).then(
            result => {
                this.comments = [];
                if (result.val()) {
                    this.commentsNames = result.val() as CommentsNames;
                    this.comments = Object.values(result.val()) as Array<Comment>;
                }
            },
            error => console.log(error)
        );
    }

    calculateDates(): void {
        if (!this.item) return;

        const date = this.item.date.split('-');
        const day = new Date(+date[0], +date[1]-1, +date[2]);

        const now = new Date();
        const today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

        const prev = new Date(+day - 86400000);
        const next = new Date(+day + 86400000);

        this.prev = prev.getFullYear() + '-' + (prev.getMonth() + 1) + '-' + prev.getDate();
        this.next = next.getFullYear() + '-' + (next.getMonth() + 1) + '-' + next.getDate();

        this.isLast = +day === +today ? true : false;
    }

    onPrevious(): void {
        this.calculateDates();
        this.router.navigate([`day/${this.prev}`]);
    }

    onNext(): void {
        this.calculateDates();
        this.router.navigate([`day/${this.next}`]);
    }
}
