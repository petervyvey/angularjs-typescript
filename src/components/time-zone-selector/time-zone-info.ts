
export interface ITimeZoneInfo {
    countryCode: string;
    name: string;
    offset: number;
}

export class TimeZoneInfo {
    constructor(public countryCode: string, public offset: number, public name: string) { }
}
