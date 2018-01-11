
import * as angular from 'angular';
import { Observable } from 'rxjs';

import { Store } from '@lib/ngrx';
import { State, ApplicationState } from 'src/store';

import template from './home.template.html';
import './home.style.scss';

export class Controller {
    constructor(
        private store: Store<State>,
        private $timeout: angular.ITimeoutService
    ) { }

    private application: Observable<ApplicationState.IState>;

    public $onInit() {
        this.application =
            this.store
                .select(store => store.Application)
                .do(() => this.$timeout);
    }
}

export const module =
    angular.module('application.views.appViewHome', [])
        .component('appViewHome', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
