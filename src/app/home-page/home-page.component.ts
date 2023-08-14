import { Subscription } from 'rxjs';
import { DailySpacePicture } from '../shared/interface';
import { NasaService } from './../services/nasa.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

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

    constructor(
        private nasaService: NasaService
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

        const endDate = new Date().
            toLocaleDateString().
            split('.').
            reverse().
            join('-');

        const startDate = new Date(+(new Date()) - ((8.64e+7) * 4)).
            toLocaleDateString().
            split('.').
            reverse().
            join('-');

        this.picturesListSub = this.nasaService.getLastFivePictures(startDate, endDate).subscribe({
            next: response => {
                this.loading = false;
                this.picturesList = response as Array<DailySpacePicture>;
                this.currentPicture = this.picturesList.length - 1;
                this.picture = this.picturesList.at(-1);
            },
            error: error => this.error = error
        })
    }

    switchPicture(index: number) {
        this.currentPicture = index;
        this.picture = this.picturesList[index];
    }
}
