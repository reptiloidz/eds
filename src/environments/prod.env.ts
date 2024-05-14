import { nasaKey } from "src/keys/nasaKey"
import { Environment } from "./interface"
import { firebaseKey } from "src/keys/firebaseKey"

export const environment: Environment = {
    production: true,
    nasaKey: nasaKey.apiKey,
    firebaseKey: firebaseKey.key,
    firebaseProjectID: firebaseKey.projectID
}

export const firebaseConfig = {
    apiKey: firebaseKey.key,
    authDomain: "blog-962bb.firebaseapp.com",
    databaseURL: "https://blog-962bb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blog-962bb",
    storageBucket: "blog-962bb.appspot.com",
    messagingSenderId: "911817092951",
    appId: "1:911817092951:web:9a89ca48b2d1f717339812"
}
