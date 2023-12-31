import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/prod.env";
import { DailySpacePicture } from "../shared/interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class NasaService {
    constructor(
        private http: HttpClient
    ) {}

    getDailyPicture() {
        return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}`);
    }

    getPictureByDate(date: string): Observable<DailySpacePicture> {
        return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}&date=${date}`) as Observable<DailySpacePicture>;
    }

    getLastFivePictures(startDate: string, endDate: string) {
        return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}&start_date=${startDate}&end_date=${endDate}`);
    }
}
