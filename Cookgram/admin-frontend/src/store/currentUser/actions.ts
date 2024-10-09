import { createAction, props } from "@ngrx/store";
import { CurrentUser } from "./curentUser.enum";

export const GetCurrentUserAction = createAction(CurrentUser.GetCurrentUser);
export const SetCurrentUserAction = createAction(CurrentUser.SetCurrentUser, props<any>());
