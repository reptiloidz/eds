import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Database, DataSnapshot, equalTo, get, orderByChild, query } from '@angular/fire/database';
import { ref } from "firebase/database";
import { Comment } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(
        private http: HttpClient
    ) {}

    private db = inject(Database);

    addNewPost(comment: Comment): Observable<any> {
        return this.http.post(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts.json`, comment)
    }

    delPost(post: string): Observable<any> {
        return this.http.delete(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts/${post}.json`)
    }

    getPosts(date: string): Promise<DataSnapshot> {
        return get(query(ref(this.db, 'posts'), orderByChild('pictureDate'), equalTo(date)));
    }
}
