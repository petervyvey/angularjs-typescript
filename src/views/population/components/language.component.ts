
import * as angular from 'angular';

import template from './language.template.html';

export class Controller {
    public language: string;
}

export const module =
    angular.module('application.views.appViewPopulationFilterLanguage', [])
        .component('appViewPopulationFilterLanguage', {
            controller: Controller,
            controllerAs: 'ctrl',
            template,
            bindings: {
                language: '<'
            }
        });
