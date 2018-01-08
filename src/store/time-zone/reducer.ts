
import { ActionReducer } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';
import { Actions, Action } from './action';

export interface IState {
    timeZones: Response.ITimeZoneInfo[];
}

// tslint:disable-next-line:variable-name
export const Reducer: ActionReducer<IState> = (state: IState, action: Actions) => {

    switch (action.type) {

        case Action.SET_TIME_ZONES:
            const payload = action.payload as Action.ISetTimeZonesPayload;
            state.timeZones = [].concat(payload.timeZones.map(x => Object.assign({}, x)));
            state = Object.assign({}, state);

            return state;

        default:
            return state;

    }
};
