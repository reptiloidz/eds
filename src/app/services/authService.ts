import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User, firebaseAuthResponse } from "../shared/interface";
import { environment } from "src/environments/prod.env";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) {}

    authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    get token(): boolean {
        const expDate = new Date(localStorage.getItem('fb-token-exp') as string);

        if (new Date() > expDate) {
            this.logout();
        }
        this.authorized$.next(!!localStorage.getItem('fb-token'));
        return this.authorized$.getValue();
    }

    private setToken(response: firebaseAuthResponse | any) {
        if (response) {
            const expDate = new Date(new Date().getTime() + (+response.expiresIn) * 1000);

            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
        }
    }

    login(user: User):Observable<any> {
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
            user
        ).pipe(
            tap(this.setToken)
        );
    }

    logout() {
        this.setToken(null)
    }

    idAuthenticated(): boolean {
        return this.token;
    }
}
