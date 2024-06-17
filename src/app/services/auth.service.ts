import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../shared/interface";
import { Database, equalTo, get, orderByChild, push, query, ref } from "@angular/fire/database";
import { Auth, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "@angular/fire/auth"
import { AccountService } from "./account.service";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient,
        private accountService: AccountService
    ) {}

    private db = inject(Database);

    readonly auth = getAuth();
    readonly authorized$ = new BehaviorSubject<boolean>(false);
    readonly idToken$ = new BehaviorSubject<string | null>(null);

    get user(): User | null {
        if (this.authorized$.getValue()) {
            return this.auth.currentUser;
        } else {
            return null;
        }
    }

    login(user: User) {
        return signInWithEmailAndPassword(
            this.auth,
            user.email as string,
            user.password as string
        ).then(() => {
            this.authorized$.next(true);
        });
    }

    signup(user: User, displayName: string) {
        return createUserWithEmailAndPassword(
            this.auth,
            user.email as string,
            user.password as string,
        ).then( response => {
            this.accountService.updateProfile(response.user, {displayName}).then(() => {
                this.authorized$.next(true);
            }, error => console.log(error));
            return response;
        });
    }

    addNewName(name: any) {
        return push(ref(this.db, 'users'), name);
    }

    getName(orderBy: string, name: string) {
        return get(query(ref(this.db, 'users'), orderByChild(orderBy), equalTo(name)));
    }

    resetPass(auth: Auth, email: string) {
        return sendPasswordResetEmail(auth, email);
    }

    deleteName(id: any): Observable<any> {
        return this.http.delete(
            `https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`
        );
    }

    logout() {
        signOut(this.auth).then(() => {
            this.authorized$.next(false);
            localStorage.clear();
        });
    }
}
