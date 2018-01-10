
import { Utils } from '../../../lib';
import { Action } from '@ngrx/store';

import { Response } from '@services/time-zone-db-store';

export const SET_TIME_ZONE_EXTRA_INFO = Utils.type('SET_TIME_ZONE_EXTRA_INFO');

export interface ISetTimeZoneExtraInfoPayload {
    countryCode: string;
    timeZoneName: string;
    extra: Response.ITimeZoneInfo;
}

export class SetTimeZoneExtraInfo implements Action {
    constructor(public payload: ISetTimeZoneExtraInfoPayload) { }

    public type = SET_TIME_ZONE_EXTRA_INFO;
}
