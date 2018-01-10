
import { ActionReducer } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';
import * as Model from './models';
import { Actions, Action } from './action';
import { ISelectCountryPayload, ISelectTimeZonePayload } from '@store/time-zone/actions';

export interface IState {
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

        case Action.SELECT_COUNTRY: {
            if (state.countries.length) {
                const payload = action.payload as ISelectCountryPayload;

                state.countries
                    .filter(x => x.isSelected)
                    .map(x => {
                        x.isSelected = false;
                        return x;
                    });


                const country = state.countries.find(x => x.code === payload.code);
                if (!!country) {
                    country.isSelected = true;

                    const timezone = country.timeZones.length > 0 ? country.timeZones[0] : null;
                    if (!!timezone) { timezone.isSelected = true; }
                }

                state.countries = [].concat(state.countries.map(x => Object.assign({}, x)));
                state = Object.assign({}, state);
            }

            return state;
        }

        case Action.SELECT_TIME_ZONE: {
            if (state.countries.length) {
                const payload = action.payload as ISelectTimeZonePayload;

                state.countries
                    .filter(x => x.isSelected)
                    .map(x => {
                        x.isSelected = false;
                        for (const timezone of x.timeZones) {
                            timezone.isSelected = false;
                        }
                        return x;
                    });


                const country = state.countries.find(x => x.code === payload.countryCode);
                if (!!country) {
                    country.isSelected = true;

                    const timezone = country.timeZones.find(x => x.name === payload.timeZoneName);
                    if (!!timezone) { timezone.isSelected = true; }
                }

                state.countries = [].concat(state.countries.map(x => Object.assign({}, x)));
                state = Object.assign({}, state);
            }

            return state;
        }

        default:
            return state;

    }
};
