
import { Action } from '@ngrx/store';
import { Utils } from '../../../lib';

export const SELECT_TIME_ZONE = Utils.type('SELECT_TIME_ZONE');

export interface ISelectTimeZonePayload {
    countryCode: string;
    timeZoneName: string;
}

export class SelectTimeZone implements Action {
    constructor(public payload: ISelectTimeZonePayload) { }

    public type = SELECT_TIME_ZONE;
}
