import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Database, DataSnapshot, equalTo, get, orderByChild, push, query, remove, update } from '@angular/fire/database';
import { ref } from "firebase/database";
import { Comment } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})

export class PostService {
    private db = inject(Database);

    addNewPost(comment: Comment) {
        return push(ref(this.db, 'posts'), comment);
    }

    editPost(postId: string, comment: Comment): Promise<void> {
        return update(ref(this.db, `posts/${postId}`), comment);
    }

    delPost(postId: string): Promise<void> {
        return remove(ref(this.db, `posts/${postId}`));
    }

    getPosts(date: string): Promise<DataSnapshot> {
        return get(query(ref(this.db, 'posts'), orderByChild('pictureDate'), equalTo(date)));
    }
}
