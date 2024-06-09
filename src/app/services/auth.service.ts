import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../shared/interface";
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

    private setToken(response: UserCredential) {
        response.user.getIdTokenResult()
        response.user.getIdTokenResult().then(result => {
            const expDate = new Date(new Date().getTime() + (+result.authTime));

            localStorage.setItem('fb-token', result.token);
            localStorage.setItem('fb-token-exp', expDate.toString());

            return result;
        });
    }

    login(user: User) {
        return signInWithEmailAndPassword(
            this.auth,
            user.email as string,
            user.password as string
        ).then(userCredential => {
            this.setToken(userCredential);
            console.log(userCredential);
        });
    }

    signup(user: User) {
        return createUserWithEmailAndPassword(
            this.auth,
            user.email as string,
            user.password as string
        ).then( response => {
            this.setToken(response);
            console.log(response.user);
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
        this.authorized$.next(false);
        localStorage.clear();
    }
}
