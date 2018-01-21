
import * as angular from 'angular';
import { Subject } from 'rxjs';
import { FilterService } from '@services/filter-service';

import template from './filter.template.html';

export class Controller {
    constructor(
        private $timeout: angular.ITimeoutService,
        private filterService: FilterService
    ) { }

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export const module =
    angular.module('application.views.appViewPopulationFilter', [])
        .component('appViewPopulationFilter', {
            controller: Controller,
            template
        });
