
import * as angular from 'angular';

import { FilterService } from '@services/filter-service';

import template from './population.template.html';

export class Controller {
    constructor(
        private filterService: FilterService
    ) { }
}

export const module =
    angular.module('application.views.population', [])
        .component('appViewPopulation', {
            controller: Controller,
            template
        });
