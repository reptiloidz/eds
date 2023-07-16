export interface DailySpacePicture {
    copyright: string,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string
    title: string,
    url: string
}

export interface User {
    email: string,
    password: string
}

export interface firebaseAuthResponse {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered: boolean
}
