
import * as angular from 'angular';

import { TransitionService } from '@uirouter/angularjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export class QueryParamsServiceProvider implements angular.IServiceProvider {
    public $get: any = [
        '$rootScope',
        '$transitions',
        (
            $rootScope: angular.IRootScopeService,
            $transitions: TransitionService,
            $timeout: angular.ITimeoutService
        ) =>
            new QueryParamsService(
                $rootScope,
                $transitions
            )
    ];

}

export interface IQueryParamsService {
    current$: Observable<any>;
    params$: BehaviorSubject<any>;
}

export class QueryParamsService implements IQueryParamsService {
    constructor(
        private $rootScope: angular.IRootScopeService,
        private $transitions: TransitionService
    ) {
        this.onInit();
    }

    public destroyed$: Subject<boolean> = new Subject<boolean>();

    public params$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

    public current$: Observable<any> =
        this.params$
            .takeUntil(this.destroyed$)
            .filter(params => !!params)
            .debounceTime(50)
            .distinctUntilChanged((x, y) => x === y, x => angular.toJson(x))
            .share();

    private onInit() {
        this.$rootScope.$on('$destroy', () => this.onDestroy());
        this.$transitions.onSuccess({}, transition => this.params$.next(transition.params()));
    }

    private onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export const module =
    angular.module('application.services.queryParamsService', [])
        .provider('queryParamsService', QueryParamsServiceProvider);
