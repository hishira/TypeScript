import { createSelector } from '@ngrx/store';
import { MainStore } from '../main.store';
import { ContextUser } from '../../app/shared/types/shared';

const CurrentUserStoreFunction = (store: MainStore) => store.currentUser;

const GetUserFromStore = (user: ContextUser): ContextUser => user;

export const CurrentUserSelector = createSelector(CurrentUserStoreFunction, GetUserFromStore);