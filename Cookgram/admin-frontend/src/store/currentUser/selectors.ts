import { createSelector } from '@ngrx/store';
import { MainStore } from '../main.store';

const CurrentUserStoreFunction = (store: MainStore) => store.currentUser;

const GetUserFromStore = (user: any): any => user;

export const CurrentUserSelector = createSelector(CurrentUserStoreFunction, GetUserFromStore);