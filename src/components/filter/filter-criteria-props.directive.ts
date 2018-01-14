
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterService } from '../../services';
import { Controller as FilterScopeController } from './filter-scope.directive';
import { Criteria } from '@services/filter-service/criteria';

export class Controller {

    public destroyed$: Subject<boolean> = new Subject<boolean>();
    public reset$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    public name: string;

    public criterion: FilterService.ICriterionIndexer = {};

    public publishChange: (criteria: FilterService.ICriteria) => void = angular.noop;

    public onCriterionChanged(criterion: FilterService.ICriterion) {
        this.criterion[criterion.code] = criterion;
        this.publishChange(new FilterService.Criteria(this.name, this.criterion));
    }

    public destroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        this.reset$.complete();
    }
}

export class Directive implements ng.IDirective {
    constructor(private filter: FilterService.FilterService) { }

    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$appFilterCriteriaProps';
    public restrict = 'A';
    public require = ['appFilterCriteriaProps', '^appFilterScope'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [controller, filterScope]: [Controller, FilterScopeController]) {
        attrs.$observe('appFilterCriteriaProps', x => controller.name = x as string);

        controller.publishChange = (criteria: FilterService.ICriteria) => {
            filterScope.onCriteriaChanged({ code: criteria.code, criterion: criteria.criterion });
        };

        // this.filter.reset$
        //     .takeUntil(controller.destroyed$)
        //     .subscribe(x => controller.reset$.next(x));

        scope.$on('$destroy', () => controller.destroy());
    }
}

export const module =
    angular.module('application.component.appFilterCriteriaProps', [])
        .directive('appFilterCriteriaProps', [
            'filterService',
            (filterService: FilterService.FilterService) => new Directive(filterService)
        ]);
