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

    readonly authorized$ = new BehaviorSubject<boolean>(false);
    readonly idToken$ = new BehaviorSubject<string | null>(null);

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
            this.authorized$.next(false);
        }
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`,
            user
        ).pipe(
            tap(this.setToken)
        );
    }

    signup(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`,
            user
        ).pipe(
            tap(this.setToken)
        );
    }

    addNewName(name: any): Observable<any> {
        return this.http.post(
            'https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/users.json',
            name
        );
    }

    getNames(): Observable<any> {
        return this.http.get('https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/users.json');
    }

    resetPass(user: Pick<User, 'email'>): Observable<any> {
        return this.http.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebaseKey}`,
            {
                ...user,
                requestType: 'PASSWORD_RESET'
            }
        );
    }

    deleteName(id: any): Observable<any> {
        return this.http.delete(
            `https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`
        );
    }

    logout() {
        this.setToken(null);
    }
}
