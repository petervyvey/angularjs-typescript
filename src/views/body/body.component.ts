
import * as angular from 'angular';

import { Store } from '@lib/ngrx';
import { State, ApplicationState } from '../../store';
import { Observable, Subject } from 'rxjs';

export class Controller {
    constructor(
        private store: Store<State>,
        private $timeout: angular.ITimeoutService,
        private $window: angular.IWindowService
    ) { }

    private destroyed$: Subject<boolean> = new Subject();

    public application$: Observable<ApplicationState.IState>;

    public $onInit() {
        this.application$ =
            this.store
                .select(state => state.Application)
                .takeUntil(this.destroyed$)
                .do(() => this.$timeout());

        this.initSubscriptions();
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    private initSubscriptions() {
        this.application$
            .takeUntil(this.destroyed$)
            .map(state => state.name)
            .subscribe(name => this.$window.document.title = name);
    }
}

export const module =
    angular.module('application.views.body', [])
        .component('body', {
            controller: Controller,
            controllerAs: 'body',
            template: `
            <!-- BODY: BEGIN -->
            <app-view-layout></app-view-layout>
            <!-- BODY: END -->
            `
        });
