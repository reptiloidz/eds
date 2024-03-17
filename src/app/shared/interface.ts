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

export interface User {
    email?: string | null | undefined,
    idToken?: string | null,
    password?: string | null | undefined,
    displayName?: string | null | undefined,
    photoUrl?: string,
    returnSecureToken?: boolean,
    refreshToken?: string,
    expiresIn?: string,
    localId?: string,
    registered?: boolean,
    requestType?: string
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

export interface Comment {
    pictureDate: string | undefined,
    date: number,
    author: string | null | undefined,
    text: string,
    id: string | null | undefined,
    pictureUrl: string | undefined,
    reaction?: boolean | null,
}

export interface CommentsNames {
    name: Comment
}

export interface ImageLikes {
    pictureDate: string,
    likes: number,
    dislikes: number,
}
