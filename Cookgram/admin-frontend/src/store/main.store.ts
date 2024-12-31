import { ContextUser } from "../app/shared/types/shared"
import { JWTTokens } from "./jwt/reducers"

export type MainStore = {
    jwt: JWTTokens,
    currentUser: ContextUser,
}