import { Subscription } from 'rxjs';
import { DailySpacePicture } from '../shared/interface';
import { NasaService } from './../services/nasa.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {
    loading: boolean = true;
    picturesListSub: Subscription;
    picturesList: Array<DailySpacePicture>;
    error: Error;
    date: any;

    constructor(
        private nasaService: NasaService
    ) {}

    ngOnInit(): void {
        this.getPicturesList();

        this.date = new Date().setDate(0)
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
        });
    }
}
