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
    loading: boolean = true;
    picturesListSub: Subscription;
    picturesList: Array<DailySpacePicture>;
    error: Error;

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
            },
            error: error => this.error = error
        })
    }
}
