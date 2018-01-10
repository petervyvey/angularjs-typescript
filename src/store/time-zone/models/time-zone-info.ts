
import { ITimeZoneInfo } from '@components/time-zone-selector';
import { Response } from '@services/time-zone-db-store';

export class TimeZoneInfo implements ITimeZoneInfo {
    constructor(public countryCode: string, public offset: number, public name: string) { }

    public isSelected: boolean = false;

    public extra: Response.ITimeZoneInfo;
}
