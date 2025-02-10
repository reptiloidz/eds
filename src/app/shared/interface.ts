import { UserInfo } from "@angular/fire/auth"

export interface DailySpacePicture {
    copyright: string,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string
    title: string,
    url: string,
}

export interface firebaseAuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}

export interface Users {
    users: [User]
}

export interface User extends UserInfo {}

export interface Comment {
    pictureDate: string | undefined,
    date: number,
    author: User | null,
    text: string,
    id: string,
    pictureUrl: string | undefined,
    reaction?: boolean | null,
}

export interface Reply {
    author: User | null,
    id: string,
    comment_id: string,
    text: string,
    date: number,
    is_read: boolean,
}

export interface CommentsNames {
    name: Comment
}

export interface ImageLikes {
    pictureDate: string,
    likes: number,
    dislikes: number,
}

export interface UserCredential {
    operationType: '',
    providerId: string | null,
    user: User,
}
