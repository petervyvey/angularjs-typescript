
import { ICountryInfo } from '@components/country-selector';
import { TimeZoneInfo } from './time-zone-info';

export class CountryInfo implements ICountryInfo {
    constructor(public code: string, public name: string) { }

    public timeZones: TimeZoneInfo[];

    public isSelected: boolean = false;
}
