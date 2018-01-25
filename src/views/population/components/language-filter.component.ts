
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';

import { FilterCheckboxGroup } from '@components/filter';

import template from './language-filter.template.html';

export class Controller {

    private destroyed$: Subject<boolean> = new Subject();
    public checkboxGroup: FilterCheckboxGroup.Controller;

    public checked$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public get checked(): boolean { return this.checked$.value; }
    public set checked(value: boolean) { this.checked$.next(value); }

    public onClicked() {
        this.checkboxGroup.toggleAll$.next(this.checked);
    }

    public $onInit() {
        this.checkboxGroup.all$
            .takeUntil(this.destroyed$)
            .subscribe(x => this.checked = x);
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export const module =
    angular.module('application.views.appViewPopulationFilterLanguageFilter', [])
        .component('appViewPopulationFilterLanguageFilter', {
            controller: Controller,
            controllerAs: 'ctrl',
            template,
            require: {
                checkboxGroup: '^appFilterCheckboxGroup'
            }
        });
