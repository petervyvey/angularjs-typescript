
import { Utils } from '../../../lib';
import { Action } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';

export const ADD_TIME_ZONE = Utils.type('ADD_TIME_ZONE');

export interface IAddTimeZonePayload {
    zone: Response.ITimeZoneInfo;
}

export class AddTimeZone implements Action {
    constructor(public payload: IAddTimeZonePayload) { }

    public type = ADD_TIME_ZONE;
}
