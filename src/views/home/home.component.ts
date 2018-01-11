
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { Store } from '@lib/ngrx';
import { State, ApplicationState } from '../../store';

import template from './home.template.html';
import './home.style.scss';

export class Controller {
    constructor(
        private store: Store<State>,
        private $timeout: angular.ITimeoutService
    ) { }

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    private application: Observable<ApplicationState.IState>;

    public applicationName$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    public get applicationName(): string { return this.applicationName$.value; }
    public set applicationName(value: string) { this.applicationName$.next(value); }

    public $onInit() {
        this.application =
            this.store
                .select(store => store.Application)
                .do(() => this.$timeout);

        this.initSubscriptions();
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public submit() {
       this.store.dispatch(new ApplicationState.Action.SetApplicationName({ name: this.applicationName }));
    }

    private initSubscriptions() {
        this.application
            .takeUntil(this.destroyed$)
            .map(state => state.name)
            .distinctUntilChanged()
            .subscribe(name => this.applicationName = name);
    }
}

export const module =
    angular.module('application.views.appViewHome', [])
        .component('appViewHome', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
