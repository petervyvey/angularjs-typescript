
import { Utils } from '../../../lib';
import { Action } from '@ngrx/store';
import { CountryInfo } from '../models';

export const SET_COUNTRIES = Utils.type('SET_COUNTRIES');

export interface ISetCountriesPayload {
    countries: CountryInfo[];
}

export class SetCountries implements Action {
    constructor(public payload: ISetCountriesPayload) { }

    public type = SET_COUNTRIES;
}
