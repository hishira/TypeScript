import { ErrorResponse, TokenResponse, Tokens } from "../../../api/types/api.types";
import { Optional } from "../../shared/types/shared";
import { hasProperty, isEmptyString, isNill } from "../../shared/utils";

export const chckIfUserExistsBasedOnResponse = (
    response: Optional<TokenResponse>
  ): boolean => {
    return (
      isNill(response) ||
      hasProperty<ErrorResponse>('error', response as any) ||
      (hasProperty<Tokens | ErrorResponse>('accessToken', response) &&
        isEmptyString(response.accessToken) &&
        isEmptyString(response.refreshToken))
    );
  }

