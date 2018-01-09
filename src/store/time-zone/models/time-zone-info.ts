
import { ITimeZoneInfo } from '@components/time-zone-selector';

export class TimeZoneInfo implements ITimeZoneInfo {
    constructor(public countryCode: string, public offset: number, public name: string) { }

    public isSelected: boolean = false;
}
