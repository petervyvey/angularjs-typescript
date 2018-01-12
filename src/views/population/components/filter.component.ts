
import * as angular from 'angular';

import template from './filter.template.html';

export class Controller {

}

export const module =
    angular.module('application.views.appViewPopulationFilter', [])
        .component('appViewPopulationFilter', {
            controller: Controller,
            template
        });
