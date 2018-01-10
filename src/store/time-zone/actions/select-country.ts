
import { Action } from '@ngrx/store';
import { Utils } from '../../../lib';

export const SELECT_COUNTRY = Utils.type('SELECT_COUNTRY');

export interface ISelectCountryPayload {
    code: string;
}

export class SelectCountry implements Action {
    constructor(public payload: ISelectCountryPayload) { }

    public type = SELECT_COUNTRY;
}
