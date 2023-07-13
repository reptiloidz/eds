import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) {}

    // login(User):Observable {
    //     return this.http.post<User>('')
    // }
}
