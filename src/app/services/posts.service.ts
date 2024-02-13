import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Database } from '@angular/fire/database';
import { ref, onValue } from "firebase/database";
import { Comment } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(
        private http: HttpClient
    ) {}

    private db = inject(Database);

    getPosts(): Observable<any> {
        return this.http.get(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
    }

    addNewPost(comment: Comment): Observable<any> {
        return this.http.post(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts.json`, comment)
    }

    delPost(post: string): Observable<any> {
        return this.http.delete(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts/${post}.json`)
    }

    getDb(postId: string, date: string) {
        const starCountRef = ref(this.db, 'posts/' + postId + '/' + date);

        return onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            return data;
        });
    }
}
