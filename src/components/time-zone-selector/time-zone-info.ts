
import { Response } from '@services/time-zone-db-store';

export interface ITimeZoneInfo {
    countryCode: string;
    name: string;
    offset: number;

    extra: Response.ITimeZoneInfo;
}
