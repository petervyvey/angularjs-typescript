
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { TimeZoneDBStore, Response } from '@services/time-zone-db-store';
import { IQueryParamsService } from '@services/query-params-service';

import template from './detail.template.html';

export class Controller {
    constructor(
        private $timeout: angular.ITimeoutService,
        private queryParamsService: IQueryParamsService,
        private timeZoneDBStore: TimeZoneDBStore
    ) {
        'ngInject';
    }

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    private timeZone$: BehaviorSubject<Response.IGetTimeZoneResponse> = new BehaviorSubject<Response.IGetTimeZoneResponse>(undefined);
    public get timeZone(): Response.IGetTimeZoneResponse { return this.timeZone$.value; }
    public set timeZone(value: Response.IGetTimeZoneResponse) { this.timeZone$.next(value); }

    public $onInit() {
        this.initSubscriptions();
    }

    public $onDestroy() {
        this.destroyed$.next(true);
    }

    private initSubscriptions() {
        Observable.combineLatest(this.queryParamsService.current$)
            .takeUntil(this.destroyed$)
            .filter(([params]) => !!params && !!params.timezone)
            .do(() => this.timeZone = null)
            .debounceTime(1000)
            .subscribe(([params]) => {
                this.timeZoneDBStore.getTimeZone(params.timezone)
                    .then(timezone => this.timeZone = timezone);
            });
    }
}

export const module =
    angular.module('application.views.appViewTimeZoneDetail', [])
        .component('appViewTimeZoneDetail', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
