
export interface ICountryInfo {
    code: string;
    name: string;
}

export class CountryInfo implements ICountryInfo {
    constructor (public code: string, public name: string) {}
}
