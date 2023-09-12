import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailySpacePicture } from '../shared/interface';
import { PostService } from '../services/posts.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html'
})
export class DayComponent implements OnInit {
    item: DailySpacePicture;
    comments: Array<Comment> | Array<undefined>;
    error: Error | undefined = undefined;
    date: string | undefined = undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private postService: PostService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.data.subscribe({
            next: data => {
                this.item = data['day'];
                this.getComments(this.item.date);
            },
            error: error => console.log(error)
        });
    }

    getComments(pictureDate: string | undefined) {
        this.postService.getPosts().pipe(
            map(data => Object.keys(data).map(k => data[k]).filter(item => item.pictureDate === pictureDate))
        ).subscribe({
            next: result => this.comments = result,
            error: error => console.log(error)
        });
    }
}
