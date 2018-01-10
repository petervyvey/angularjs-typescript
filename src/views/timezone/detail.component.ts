
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { TimeZoneDBStore, Response } from '@services/time-zone-db-store';
import { IQueryParamsService } from '@services/query-params-service';
import { Store } from '@lib/ngrx';
import { State, TimeZoneState } from '../../store';

import template from './detail.template.html';

export class Controller {
    constructor(
        private $timeout: angular.ITimeoutService,
        private queryParamsService: IQueryParamsService,
        private timeZoneDBStore: TimeZoneDBStore,
        private store: Store<State>
    ) {
        'ngInject';
    }

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    private state: Observable<TimeZoneState.IState>;

    private timeZone$: Observable<TimeZoneState.Model.TimeZoneInfo>;

    public $onInit() {
        this.state =
            this.store
                .select(store => store.TimeZone)
                .takeUntil(this.destroyed$)
                .do(state => this.$timeout());

        this.initSubscriptions();
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    private initSubscriptions() {
        this.timeZone$ =
            this.state
                .map(state => state.countries.find(country => country.isSelected))
                .filter(country => !!country)
                .map(country => country.timeZones.find(tz => tz.isSelected))
                .do(() => this.$timeout())
                .share();

        this.timeZone$
            .takeUntil(this.destroyed$)
            .filter(timezone => !!timezone)
            .debounceTime(1000)
            .do(timezone => {
                if (!timezone.extra) {
                    this.timeZoneDBStore.getTimeZone(timezone.name)
                        .then(response =>
                            this.store.dispatch(
                                new TimeZoneState.Action.SetTimeZoneExtraInfo({
                                    countryCode: timezone.countryCode,
                                    timeZoneName: timezone.name,
                                    extra: response
                                })
                            )
                        );
                }
            })
            .subscribe();
    }
}

export const module =
    angular.module('application.views.appViewTimeZoneDetail', [])
        .component('appViewTimeZoneDetail', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
