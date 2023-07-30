import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DbUser } from "../shared/interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/prod.env";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(
        private http: HttpClient
    ) {}

    newUser(userData: DbUser):Observable<any> {
        return this.http.put(
            `https://${environment.firebaseProjectID}.europe-west1.firebasedatabase.app/users.json`,
            userData
        );
    }
}
