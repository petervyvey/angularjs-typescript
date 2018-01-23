
import * as angular from 'angular';
import { StateService } from '@uirouter/core';

import { IQueryParamsService } from '@services/query-params-service';
import { FilterService } from '@services/filter-service';

import template from './population.template.html';

export class Controller {
    constructor(
        private $state: StateService,
        private queryParamsService: IQueryParamsService,
        private filterService: FilterService
    ) { }

    public $onInit() {
        this.queryParamsService.params$.next(this.$state.params);
    }
}

export const module =
    angular.module('application.views.population', [])
        .component('appViewPopulation', {
            controller: Controller,
            template
        });
