import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/prod.env";

@Injectable({
    providedIn: 'root'
})

export class NasaService {
    constructor(
        private http: HttpClient
    ) {}

    getDailyPicture() {
        return this.http.get(`https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}`)
    }
}
