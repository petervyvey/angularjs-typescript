
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

    public $onInit() {
        this.filterService.scope$
            .takeUntil(this.destroyed$)
            .filter(scope => !!scope)
            .map(scope => scope.population)
            .filter(scope => !!scope)
            .debounceTime(10)
            .subscribe(scope => this.$timeout(() => console.log('change', scope)));
    }

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
