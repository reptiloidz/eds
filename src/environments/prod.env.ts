import { nasaKey } from "src/keys/nasaKey"
import { Environment } from "./interface"
import { firebaseKey } from "src/keys/firebaseKey"

export const environment: Environment = {
    production: true,
    nasaKey: nasaKey.apiKey,
    firebaseKey: firebaseKey.key,
    firebaseProjectID: firebaseKey.projectID
}
