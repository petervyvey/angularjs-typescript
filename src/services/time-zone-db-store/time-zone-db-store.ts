
import * as angular from 'angular';

import { ITimeZoneDBServiceSettings } from './time-zone-db-settings';
import { IGetTimeZonesResponse, IGetTimeZoneResponse } from './time-zone-db-response';

export class TimeZoneDBStoreProvider implements angular.IServiceProvider {
    public $get = [
        '$http',
        '$q',
        (
            $http: angular.IHttpService,
            $q: angular.IQService
        ) =>
            new TimeZoneDBStore(
                $http,
                $q,
                this.settings
            )
    ];

    private settings: ITimeZoneDBServiceSettings = {
        url: 'http://api.timezonedb.com/v2',
        apiKey: null,
        format: 'json'
    };

    public configure(options: Partial<ITimeZoneDBServiceSettings>) {
        this.settings = angular.extend(this.settings, options);
    }
}

export interface ITimeZoneDBStore {
    getTimeZones(): angular.IPromise<IGetTimeZonesResponse>;
    getTimeZone(name: string): angular.IPromise<IGetTimeZoneResponse>;
}

export class TimeZoneDBStore implements ITimeZoneDBStore {
    constructor(
        private $http: angular.IHttpService,
        private $q: angular.IQService,
        private settings: ITimeZoneDBServiceSettings
    ) { }

    public getTimeZones(): angular.IPromise<IGetTimeZonesResponse> {
        return this.$http
            .get(`${this.settings.url}/list-time-zone?key=${this.settings.apiKey}&format=${this.settings.format}`)
            .then(x => x.data as IGetTimeZonesResponse);
    }

    public getTimeZone(name: string): angular.IPromise<IGetTimeZoneResponse> {
        // http://api.timezonedb.com/v2/get-time-zone?key=YOUR_API_KEY&format=xml&by=zone&zone=America/Chicago
        return this.$http
            .get(`${this.settings.url}/get-time-zone?key=${this.settings.apiKey}&format=${this.settings.format}&by=zone&zone=${name}`)
            .then(x => x.data as IGetTimeZoneResponse);
    }
}

export const module =
    angular.module('application.services.timeZoneDBStore', [])
        .provider('timeZoneDBStore', TimeZoneDBStoreProvider);
