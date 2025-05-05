import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    Database,
    equalTo,
    get,
    orderByChild,
    push,
    query,
    ref,
} from '@angular/fire/database';
import {
    Auth,
    createUserWithEmailAndPassword,
    deleteUser,
    getAuth,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
    User,
} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    private db = inject(Database);
    readonly auth = getAuth();

    get user(): User | null {
        return this.auth.currentUser;
    }
    get authenticated(): boolean {
        return localStorage.getItem('firebase-anticipated') ? true : false;
    }

    authReady() {
        return this.auth.authStateReady().then(() => {
            return this.auth.currentUser;
        });
    }

    login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password).then(
            () => {
                localStorage.setItem('firebase-anticipated', 'true');
            },
        );
    }

    signup(email: string, password: string, displayName: string) {
        return createUserWithEmailAndPassword(this.auth, email, password).then(
            response => {
                this.updateProfile(response.user, { displayName }).then(error =>
                    console.log(error),
                );
                localStorage.setItem('firebase-anticipated', 'true');
                return response;
            },
        );
    }

    async signUpWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth, provider);

        return result;
    }

    addNewName(name: any) {
        return push(ref(this.db, 'users'), name);
    }

    getName(orderBy: string, name: string) {
        return get(
            query(ref(this.db, 'users'), orderByChild(orderBy), equalTo(name)),
        );
    }

    resetPass(auth: Auth, email: string) {
        return sendPasswordResetEmail(auth, email);
    }

    deleteName(id: any): Observable<any> {
        return this.http.delete(
            `https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
        );
    }

    updateProfile(user: User, data: any) {
        return updateProfile(user, data);
    }

    updatePassword(user: User, newPassword: string) {
        return updatePassword(user, newPassword);
    }

    deleteUser(user: User) {
        return deleteUser(user);
    }

    logout() {
        signOut(this.auth);
        localStorage.removeItem('firebase-anticipated');
    }
}
