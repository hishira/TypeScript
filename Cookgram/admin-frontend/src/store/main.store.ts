import { JWTTokens } from "./jwt/reducers"

export type MainStore = {
    jwt: JWTTokens,
    currentUser: any,
}