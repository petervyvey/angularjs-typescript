
import * as angular from 'angular';

import template from './language-filter.template.html';

export class Controller {

}

export const module =
    angular.module('application.views.appViewPopulationFilterLanguageFilter', [])
        .component('appViewPopulationFilterLanguageFilter', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
