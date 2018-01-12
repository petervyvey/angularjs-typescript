
import { ActionReducer } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';
import * as Model from './models';
import { Actions, Action } from './action';
import { ISelectCountryPayload, ISelectTimeZonePayload, ISetTimeZoneExtraInfoPayload } from '@store/time-zone/actions';

export interface IState {
    countries: Model.CountryInfo[];
    selectedCountry: Model.CountryInfo;
    selectedTimeZone: Model.TimeZoneInfo;
}

// tslint:disable-next-line:variable-name
export const Reducer: ActionReducer<IState> = (state: IState, action: Actions) => {

    switch (action.type) {

        case Action.REFRESH: {
            state = Object.assign({}, state);

            return state;
        }

        case Action.SET_COUNTRIES: {
            const payload = action.payload as Action.ISetCountriesPayload;
            state.countries = [].concat(payload.countries.map(x => Object.assign({}, x)));
            state = Object.assign({}, state);

            return state;
        }

        case Action.SELECT_COUNTRY: {
            const payload = action.payload as ISelectCountryPayload;

            state.countries
                .filter(x => x.isSelected)
                .map(x => {
                    x.isSelected = false;
                    return x;
                });

            const country = getCountryByCode(state.countries, payload.code);
            if (!!country) {
                country.isSelected = true;

                const timezone = country.timeZones.length > 0 ? country.timeZones[0] : null;
                if (!!timezone) { timezone.isSelected = true; }

                state.selectedCountry = country;
                state.selectedTimeZone = timezone;
                state.countries = [].concat(state.countries.map(x => Object.assign({}, x)));
                state = Object.assign({}, state);
            }

            return state;
        }

        case Action.SELECT_TIME_ZONE: {
            const payload = action.payload as ISelectTimeZonePayload;

            state.countries
                .filter(x => x.isSelected)
                .map(x => {
                    x.isSelected = false;
                    return x;
                });

            const country = getCountryByCode(state.countries, payload.countryCode);
            if (!!country) {
                country.isSelected = true;
                country.timeZones.map(tz => {
                    tz.isSelected = false;
                    return tz;
                });

                const timezone = country.timeZones.find(x => x.name === payload.timeZoneName);
                if (!!timezone) { timezone.isSelected = true; }

                state.selectedCountry = country;
                state.selectedTimeZone = timezone;
                state.countries = [].concat(state.countries.map(x => Object.assign({}, x)));
                state = Object.assign({}, state);
            }

            return state;
        }

        case Action.SET_TIME_ZONE_EXTRA_INFO: {
            const payload = action.payload as ISetTimeZoneExtraInfoPayload;
            const country = getCountryByCode(state.countries, payload.countryCode);
            if (!!country) {
                const timezone = country.timeZones.find(x => x.name === payload.timeZoneName);
                if (!!timezone) { timezone.extra = payload.extra; }

                state.countries = [].concat(state.countries.map(x => Object.assign({}, x)));
                state = Object.assign({}, state);
            }

            return state;
        }

        default:
            return state;

    }
};

function getCountryByCode(countries: Model.CountryInfo[], code: string): Model.CountryInfo {
    let country: Model.CountryInfo = null;
    if (countries.length) {
        country = countries.find(x => x.code === code);
    }

    return country;
}

function getTimeZoneByName(timeZones: Model.TimeZoneInfo[], name: string): Model.TimeZoneInfo {
    let timeZone: Model.TimeZoneInfo = null;
    if (timeZones.length) {
        timeZone = timeZones.find(x => x.name === name);
    }

    return timeZone;
}
