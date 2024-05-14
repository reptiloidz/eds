import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User, firebaseAuthResponse } from "../shared/interface";
import { environment } from "src/environments/prod.env";
import { Database, get, push, query, ref } from "@angular/fire/database";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from "@angular/fire/auth"

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) {}

    private db = inject(Database);
    private auth = getAuth();

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
            const expDate = new Date(new Date().getTime() + (+response.stsTokenManager.expirationTime) * 1000);

            localStorage.setItem('fb-token', response.stsTokenManager.accessToken);
            localStorage.setItem('fb-token-exp', expDate.toString());
        } else {
            localStorage.clear();
            this.authorized$.next(false);
        }
    }

    login(user: User) {
        user.returnSecureToken = true;

        return signInWithEmailAndPassword(
            this.auth,
            user.email as string,
            user.password as string
        ).then(userCredential => {
            this.setToken(userCredential.user);
        });
    }

    signup(user: User): Promise<UserCredential | void> {
        user.returnSecureToken = true;

        return createUserWithEmailAndPassword(
            this.auth,
            user.email as string,
            user.password as string
        ).then(userCredential => {
            this.setToken(userCredential);
        });
    }

    addNewName(name: any) {
        return push(ref(this.db, 'users'), name);
    }

    getNames() {
        return get(query(ref(this.db, 'users')));
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
