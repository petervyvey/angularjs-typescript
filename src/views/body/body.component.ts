
import * as angular from 'angular';

import { Store } from '@lib/ngrx';
import { State, ApplicationState } from '../../store';
import { Observable, Subject } from 'rxjs';

export class Controller {
    constructor(
        private store: Store<State>
    ) { }

    private destroyed$: Subject<boolean> = new Subject();

    public application: Observable<ApplicationState.IState>;

    public $onInit() {
        this.application = this.store.select(s => s.Application).takeUntil(this.destroyed$);
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
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
