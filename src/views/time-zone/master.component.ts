
import * as angular from 'angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import { Utils } from '../../lib';
import { IQueryParamsService } from '@services/query-params-service';
import { TimeZoneDBStore, Response } from '@services/time-zone-db-store';
import { CountrySelector, TimeZoneSelector } from '../../components';

import { StateService } from '@uirouter/angularjs';
import { State, TimeZoneState } from '../../store';
import { IController as ITimeZoneController } from './time-zone.component';

import template from './master.template.html';
import './master.style.scss';

export class Controller {
    constructor(
        private store: Store<State>,
        private $state: StateService,
        private $timeout: angular.ITimeoutService,
        private queryParamsService: IQueryParamsService,
        private timeZoneDBStore: TimeZoneDBStore
    ) {
        'ngInject';
    }

    public parent: ITimeZoneController;

    private destroyed$: Subject<boolean> = new Subject<boolean>();
    private state: Observable<TimeZoneState.IState>;

    private countries$: Observable<CountrySelector.ICountryInfo[]>;

    private timeZones$: Observable<TimeZoneSelector.ITimeZoneInfo[]>;

    private selectedCountry$: BehaviorSubject<CountrySelector.ICountryInfo> = new BehaviorSubject<CountrySelector.ICountryInfo>(undefined);
    public get selectedCountry(): CountrySelector.ICountryInfo { return this.selectedCountry$.value; }
    public set selectedCountry(value: CountrySelector.ICountryInfo) { this.selectedCountry$.next(value); }

    private selectedTimeZone$: BehaviorSubject<TimeZoneSelector.ITimeZoneInfo> = new BehaviorSubject<TimeZoneSelector.ITimeZoneInfo>(undefined);
    public get selectedTimeZone(): TimeZoneSelector.ITimeZoneInfo { return this.selectedTimeZone$.value; }
    public set selectedTimeZone(value: TimeZoneSelector.ITimeZoneInfo) { this.selectedTimeZone$.next(value); }

    public $onInit() {
        this.state =
            this.store
                .select(x => x.TimeZone)
                .takeUntil(this.destroyed$)
                .do(() => this.$timeout());

        this.state
            .takeWhile(state => state.countries.length === 0)
            .subscribe(state => {
                if (state.countries.length === 0) {
                    this.initData();
                } else {
                    this.store.dispatch(new TimeZoneState.Action.Refresh());
                }
            });

        this.initSubscriptions();
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        this.selectedCountry$.complete();
        this.selectedTimeZone$.complete();
    }

    public onCountrySelectionChanged(country: CountrySelector.ICountryInfo) {
        const params = { country: country.code, timezone: null };
        this.$state.go(this.$state.current.name, params);
    }

    public onTimeZoneSelectionChanged(timeZone: TimeZoneSelector.ITimeZoneInfo) {
        // filter: ['criteria.1.language:NL', 'criteria.1.city:Brugge']
        const params = { country: this.selectedCountry.code, timezone: timeZone.name };
        this.$state.go(this.$state.current.name, params);
    }

    private initData() {
        this.parent.isBusy = true;
        Observable
            .fromPromise(this.timeZoneDBStore.getTimeZones())
            .takeUntil(this.destroyed$)
            .map(response => {
                const countries =
                    Utils
                        .distinct(response.zones, z => z.countryCode)
                        .map(z => new TimeZoneState.Model.CountryInfo(z.countryCode, z.countryName));

                const timeZones =
                    response.zones
                        .map(z => new TimeZoneState.Model.TimeZoneInfo(z.countryCode, z.gmtOffset, z.zoneName));

                for (const country of countries) {
                    country.timeZones = timeZones.filter(t => t.countryCode === country.code);
                }

                return countries;
            })
            .do(countries => this.store.dispatch(new TimeZoneState.Action.SetCountries({ countries })))
            .catch(error => Observable.throw(error))
            .finally(() => this.parent.isBusy = false)
            .subscribe();
    }

    private initSubscriptions() {

        this.state
            .map(state => state.countries.find(x => x.isSelected))
            .subscribe(country => {
                this.selectedCountry = country;
                if (!!country) {
                    this.selectedTimeZone = country.timeZones.find(x => x.isSelected);
                }
            });

        this.countries$ =
            this.state
                .map(state => state.countries);

        this.timeZones$ =
            this.state
                .map(state => state.countries.find(x => x.isSelected))
                .filter(country => !!country)
                .map(country => country.timeZones)
                .share();

        Observable.combineLatest(this.queryParamsService.current$, this.countries$)
            .takeUntil(this.destroyed$)
            .debounceTime(25)
            .filter(([params, countries]) => !!params && !!countries && countries.length > 0)
            .do(([params]) => {
                if (!!params.country && !params.timezone) {
                    this.store.dispatch(new TimeZoneState.Action.SelectCountry({ code: params.country }));
                } else if (!!params.country && !!params.timezone) {
                    this.store.dispatch(new TimeZoneState.Action.SelectTimeZone({ countryCode: params.country, timeZoneName: params.timezone }));
                }
            })
            .subscribe();
    }
}

export const module =
    angular.module('application.views.appViewTimeZoneMaster', [])
        .component('appViewTimeZoneMaster', {
            controller: Controller,
            controllerAs: 'ctrl',
            require: {
                parent: '^appViewTimeZone'
            },
            template
        });
