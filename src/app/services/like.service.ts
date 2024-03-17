import { inject, Injectable } from "@angular/core";
import { Database, DataSnapshot, equalTo, get, orderByChild, push, query, ref } from "@angular/fire/database";
import { ImageLikes } from "../shared/interface";

@Injectable({
    providedIn: 'root'
})

export class LikeService {
    private db = inject(Database);

    getLikes(orderBy: string, equal: string): Promise<DataSnapshot> {
        return get(query(ref(this.db, 'likes'), orderByChild(orderBy), equalTo(equal)));
    }

    addLike(reaction: ImageLikes) {
        return push(ref(this.db, 'likes'), reaction);
    }
}
