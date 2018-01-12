
import * as angular from 'angular';

import template from './language-checkbox.template.html';

export class Controller {
    public language: string;

    public checked: boolean;
}

export const module =
    angular.module('application.views.appViewPopulationFilterLanguageCheckbox', [])
        .component('appViewPopulationFilterLanguageCheckbox', {
            controller: Controller,
            controllerAs: 'ctrl',
            template,
            bindings: {
                language: '<'
            }
        });
