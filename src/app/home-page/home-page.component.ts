import { Observer, Subscription } from 'rxjs';
import { DailySpacePicture } from '../shared/interface';
import { NasaService } from './../services/nasa.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {
    picture: DailySpacePicture | any;
    error: Error;
    loading: boolean = true;
    pictureSub: Subscription;
    picturesListSub: Subscription;
    picturesList: object;

    constructor(
        private nasaService: NasaService
    ) {}

    ngOnInit(): void {
        this.getPicture();
        this.getPicturesList();
    }

    ngOnDestroy(): void {
        if(this.picture) {
            this.pictureSub.unsubscribe();
        }
    }

    getPicture() {
        this.loading = true;
        this.pictureSub =  this.nasaService.getDailyPicture().subscribe({
            next: result => {
                this.picture = result;
                this.loading = false;
            },
            error: error => this.error = error
        });
    }

    getPicturesList() {
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
                this.picturesList = response;
            }
        })
    }
}
