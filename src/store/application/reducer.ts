
import { ActionReducer } from '@ngrx/store';

import { Actions, Action } from './action';

export interface IState {
    name: string;
    version: string;
}

export const Reducer: ActionReducer<IState> = (state: IState, action: Actions) => {

    switch (action.type) {

        case Action.SET_APPLICATION_NAME:
            const payload = action.payload as Action.ISetApplicationName;
            state = Object.assign({}, state, payload);

            return state;

        default:
            return state;

    }
};
