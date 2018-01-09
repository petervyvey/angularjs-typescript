
import { ActionReducer } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';
import * as Model from './models';
import { Actions, Action } from './action';

export interface IState {
    timeZones: Response.ITimeZoneInfo[];
    countries: Model.CountryInfo[];
}

// tslint:disable-next-line:variable-name
export const Reducer: ActionReducer<IState> = (state: IState, action: Actions) => {

    switch (action.type) {

        case Action.SET_COUNTRIES: {
            const payload = action.payload as Action.ISetCountriesPayload;
            state.countries = [].concat(payload.countries.map(x => Object.assign({}, x)));
            state = Object.assign({}, state);
            return state;
        }

        case Action.SET_TIME_ZONES: {
            const payload = action.payload as Action.ISetTimeZonesPayload;
            state.timeZones = [].concat(payload.timeZones.map(x => Object.assign({}, x)));
            state = Object.assign({}, state);

            return state;
        }

        default:
            return state;

    }
};
