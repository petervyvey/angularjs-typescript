
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { Response } from '@services/time-zone-db-store';
import { IQueryParamsService } from '@services/query-params-service';
import { State, TimeZoneState } from '@store/index';

import template from './time-zone.template.html';
import './time-zone.style.css';

export function filterTimeZoneByCountry() {
    return (timeZones: Response.ITimeZoneInfo[], countryCode: string) => {
        return timeZones
            .filter(x => x.countryCode === countryCode)
            .map(x => ({ name: x.zoneName, offset: x.gmtOffset, countryCode: x.countryCode } as TimeZoneState.Model.TimeZoneInfo));
    };
}

export interface IController {
    isBusy: boolean;
}

class Controller implements IController {
    constructor(
        private $state: angular.ui.IStateService,
        private queryParamsService: IQueryParamsService
    ) {
        'ngInject';
    }

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    private isBusy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public get isBusy(): boolean { return this.isBusy$.value; }
    public set isBusy(value: boolean) { this.isBusy$.next(value); }

    public $onInit() {
        this.queryParamsService.params$.next(this.$state.params);
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        this.isBusy$.complete();
    }
}

export const module =
    angular.module('application.views.appViewTimeZone', [])
        .component('appViewTimeZone', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        })
        .filter('appFilterTimeZoneByCountry', filterTimeZoneByCountry);
