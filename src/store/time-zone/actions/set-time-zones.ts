
import { Utils } from '../../../lib';
import { Action } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';

export const SET_TIME_ZONES = Utils.type('SET_TIME_ZONES');

export interface ISetTimeZonesPayload {
    timeZones: Response.ITimeZoneInfo[];
}

export class SetTimeZones implements Action {
    constructor(public payload: ISetTimeZonesPayload) { }

    public type = SET_TIME_ZONES;
}
