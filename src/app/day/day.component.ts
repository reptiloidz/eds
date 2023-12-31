import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySpacePicture } from '../shared/interface';
import { PostService } from '../services/posts.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
})
export class DayComponent implements OnInit {
    item: DailySpacePicture | null = null;
    comments: Array<Comment> | Array<undefined>;
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
                this.getComments(this.item?.date);
                this.calculateDates();
                this.loading = false;

            },
            error: error => console.log(error)
        });
    }

    getComments(pictureDate: string | undefined): void {
        this.postService.getPosts().pipe(
            map(data => Object.keys(data).map(k => data[k]).filter(item => item.pictureDate === pictureDate))
        ).subscribe({
            next: result => this.comments = result,
            error: error => console.log(error)
        });
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
