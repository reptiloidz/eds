import { Injectable } from "@angular/core";
import { User, Users } from "../shared/interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/prod.env";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    public user$ = new BehaviorSubject<User | null>(null);

    constructor(
        private http: HttpClient
    ) {}

    updateProfile(user: User) {
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseKey}`,
            user
        ).pipe(
            tap(response => {
                this.user$.next(response);
            })
        )
    }

    getProfile(user: User) {
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebaseKey}`,
            user
        ).pipe(
            tap(response => {
                const data = response as Users;
                this.user$.next(data.users[0]);
            })
        )
    }
}
