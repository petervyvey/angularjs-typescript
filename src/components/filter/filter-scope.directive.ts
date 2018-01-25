
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';

import { FilterService } from '../../services';
import { Controller as CheckboxGroupController } from './filter-checkbox-group.directive';
import { Controller as CriteriaController } from './filter-criteria.directive';

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
    ) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
    }

    public destroyed$: Subject<boolean> = new Subject<boolean>();
    public criteria: FilterService.ICriteriaIndexer = {};

    public code$: BehaviorSubject<string>;
    public get code(): string {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        return this.code$.value;
    }
    public set code(value: string) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        this.code$.next(value);
    }

    public changeCriteria(criteria: FilterService.ICriteria) {
        this.criteria[criteria.code] = criteria;
        this.filterService.changeScope({ code: this.code, criteria: this.criteria });
    }

    public destroyCriteria(code: string) {
        if (!!this.criteria[code]) {
            delete this.criteria[code];
            this.filterService.changeScope({ code: this.code, criteria: this.criteria });
        }
    }

    public destroy() {
        this.filterService.destroyScope(this.code);

        this.destroyed$.next(true);
        this.destroyed$.complete();

        this.code$.complete();
    }
}

export class Directive implements angular.IDirective {

    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$appFilterScope';
    public restrict = 'A';
    public scope = { code: '@appFilterScope' };

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
