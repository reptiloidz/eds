import { Subscription, map } from 'rxjs';
import { DailySpacePicture } from '../shared/interface';
import { NasaService } from './../services/nasa.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../services/posts.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {
    picture: DailySpacePicture | undefined;
    error: Error;
    loading: boolean = true;
    pictureSub: Subscription;
    picturesListSub: Subscription;
    picturesList: Array<DailySpacePicture>;
    currentPicture: number;
    comments: Array<Comment> | Array<undefined>;

    constructor(
        private nasaService: NasaService,
        private postService: PostService
    ) {}

    ngOnInit(): void {
        this.getPicturesList();
    }

    ngOnDestroy(): void {
        if(this.picturesList) {
            this.picturesListSub.unsubscribe();
        }
    }

    getPicturesList() {
        this.loading = true;

        const today = new Date();
        const fiveDaysEgo = new Date(+today - ((8.64e+7) * 4));

        const endDate = `${today.getFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`;
        const startDate = `${fiveDaysEgo.getFullYear()}-${fiveDaysEgo.getUTCMonth() + 1}-${fiveDaysEgo.getUTCDate()}`;

        this.picturesListSub = this.nasaService.getLastFivePictures(startDate, endDate).subscribe({
            next: response => {
                this.loading = false;
                this.picturesList = response as Array<DailySpacePicture>;
                this.currentPicture = this.picturesList.length - 1;
                this.picture = this.picturesList.at(-1);
                this.getPosts(this.picture?.date);
            },
            error: error => this.error = error
        })
    }

    getPosts(pictureDate: string | undefined) {
        this.postService.getPosts().pipe(
            map(data => Object.keys(data).map(k => data[k]).filter(item => item.pictureDate === pictureDate))
        ).subscribe({
            next: result => this.comments = result,
            error: error => console.log(error)
        });
    }

    switchPicture(index: number) {
        this.currentPicture = index;
        this.picture = this.picturesList[index];
        this.getPosts(this.picture?.date);
    }
}
