import { JWTTokens } from "./jwt/reducers"

export type MainStore = {
    jwt: JWTTokens,
    user: any,
}