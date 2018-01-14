
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';

import { FilterService } from '../../services';
import { Controller as CheckboxGroupPropsController } from './filter-checkbox-group-props.directive';
import { Controller as CriteriaPropsController } from './filter-criteria-props.directive';

export interface IFilterScopeRegistrableController {
    all: boolean;
    some: boolean;
    reset(): void;
    setCriterion(criterion: FilterService.ICriterion);
}

export class Controller {

    public static $inject = [
        'filterService'
    ];

    constructor(
        private filterService: FilterService.FilterService
    ) { }

    public destroyed$: Subject<boolean> = new Subject<boolean>();

    public name: string;
    public criteria: FilterService.ICriteriaIndexer = {};

    public onCriteriaChanged(criteria: FilterService.ICriteria) {
        this.criteria[criteria.code] = criteria;
        this.filterService.onScopeChanged({ code: this.name, criteria: this.criteria });
    }

    public destroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        // this.filterService.destroyScope(this.name);
    }
}

export class Directive implements angular.IDirective {

    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$appFilterScope';
    public restrict = 'A';
    public scope = { name: '@appFilterScope' };

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, controller: Controller) {
        scope.$on('$destroy', event => controller.destroy());
    }
}

export const module =
    angular.module('application.component.appFilterScope', [])
        .directive('appFilterScope', () => new Directive());
