
import * as angular from 'angular';

import { FilterService } from '../../../services';
import { FilterCriterion } from '@components/filter';

import template from './language-checkbox.template.html';

export class Controller {
    public language: string;

    public checked: boolean;

    public filterCriterion: FilterCriterion.Controller;

    public onChange() {
        this.filterCriterion.criterionChanged(new FilterService.BooleanCriterion(this.language, this.checked));
    }
}

export const module =
    angular.module('application.views.appViewPopulationFilterLanguageCheckbox', [])
        .component('appViewPopulationFilterLanguageCheckbox', {
            controller: Controller,
            controllerAs: 'ctrl',
            template,
            bindings: {
                language: '<'
            },
            require: {
                filterCriterion: '^appFilterCriterion'
            }
        });
