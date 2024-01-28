import { Comment } from './../shared/interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PostService {
    constructor(
        private http: HttpClient
    ) {}

    getPosts(): Observable<any> {
        return this.http.get(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts.json`);
    }

    addNewPost(comment: Comment): Observable<any> {
        return this.http.post(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts.json`, comment)
    }

    delPost(post: string): Observable<any> {
        return this.http.delete(`https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app/posts/${post}.json`)
    }
}
