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

    constructor(
        private nasaService: NasaService
    ) {}

    ngOnInit(): void {
        this.getPicture();
    }

    ngOnDestroy(): void {
        this.pictureSub.unsubscribe();
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
}
