import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../shared/interface";
import { environment } from "src/environments/prod.env";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) {}

    login(user: User):Observable<any> {
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
            user
        )
    }
}
