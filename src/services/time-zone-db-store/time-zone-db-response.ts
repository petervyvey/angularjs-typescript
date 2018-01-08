
export interface ITimeZoneDBResponse {
    message: string;
    status: string;
}

export interface IGetTimeZonesResponse extends ITimeZoneDBResponse {
    zones: ITimeZoneInfo[];
}

export interface ITimeZoneInfo {
    countryCode: string;
    countryName: string;
    gmtOffset: number;
    timestamp: number;
    zoneName: string;
}

export interface IGetTimeZoneResponse extends ITimeZoneDBResponse {
    abbreviation: string;
    countryCode: string;
    countryName: string;
    dst: string;
    dstEnd: number;
    dstStart: number;
    formatted: string;
    gmtOffset: number;
    nextAbbreviation: string;
    timestamp: number;
    zoneName: string;
}
