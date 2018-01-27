
import * as angular from 'angular';
import { Subject } from 'rxjs';

import { FilterService } from '../../../services';
import { FilterCriterion, FilterScope } from '@components/filter';

import template from './language-checkbox.template.html';

export class Controller {

    private destroyed$: Subject<boolean> = new Subject<boolean>();
    public filterScope: FilterScope.Controller;
    public filterCriterion: FilterCriterion.Controller;
    public language: string;
    public languageName: string;
    public checked: boolean;

    public $onInit() {
        this.filterCriterion
            .criterion$
            .takeUntil(this.destroyed$)
            .filter(criterion => !!criterion)
            .filter(criterion => criterion.code === this.language)
            .subscribe(criterion => this.checked = criterion.value);

        this.filterScope
            .reset$
            .takeUntil(this.destroyed$)
            .subscribe(() => {
                this.checked = false;
                this.onChange();
            });
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

    public onChange() {
        this.filterCriterion.changeCriterion(new FilterService.BooleanCriterion(this.language, this.checked));
    }
}

export const module =
    angular.module('application.views.appViewPopulationFilterLanguageCheckbox', [])
        .component('appViewPopulationFilterLanguageCheckbox', {
            controller: Controller,
            controllerAs: 'ctrl',
            template,
            bindings: {
                language: '<',
                languageName: '<'
            },
            require: {
                filterScope: '^^appFilterScope',
                filterCriterion: '^appFilterCriterion'
            }
        });
