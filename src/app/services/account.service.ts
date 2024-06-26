import { Injectable } from "@angular/core";
// import { Users } from "../shared/interface";
import { HttpClient } from "@angular/common/http";
// import { environment } from "src/environments/prod.env";
import { BehaviorSubject, tap } from "rxjs";
import { updateEmail, updateProfile, User } from "@angular/fire/auth";

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    public user$ = new BehaviorSubject<User | null>(null);

    constructor(
        private http: HttpClient
    ) {}

    // updateProfile(user: User, data: any) {
    //     return updateProfile(user, data)
    // }

    updateEmail(user: User, newEmail: string) {
        return updateEmail(user, newEmail);
    }

    // updatePass(user: User) {
    //     return this.http.post(
    //         `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.firebaseKey}`,
    //         user
    //     ).pipe(
    //         tap(
    //             response => this.user$.next(response)
    //         )
    //     )
    // }

    // deleteAccount(user: User) {
    //     return this.http.post(
    //         `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${environment.firebaseKey}`,
    //         user
    //     ).pipe(
    //         tap(
    //             () => this.user$.next(null)
    //         )
    //     );
    // }
}
