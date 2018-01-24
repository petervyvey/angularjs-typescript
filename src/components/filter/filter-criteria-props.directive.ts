
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterService } from '../../services';
import { Controller as FilterScopeController } from './filter-scope.directive';
import { Criteria } from '@services/filter-service/criteria';
import { Observable } from 'rxjs/Observable';

export class Controller {

    constructor(
        private filterService: FilterService.FilterService
    ) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
    }

    public destroyed$: Subject<boolean> = new Subject<boolean>();
    public reset$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    public scope$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    public namespace$: BehaviorSubject<[string, string]> = new BehaviorSubject<[string, string]>([undefined, undefined]);
    public criterion: FilterService.ICriterionIndexer = {};
    public publishChange: (criteria: FilterService.ICriteria) => void = angular.noop;

    public code$: BehaviorSubject<string>;
    public get code(): string {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        return this.code$.value;
    }
    public set code(value: string) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        this.code$.next(value);
    }

    public onCriterionChanged(criterion: FilterService.ICriterion) {
        this.criterion[criterion.code] = criterion;
        this.publishChange(new FilterService.Criteria(this.code, this.criterion));
    }

    public onCriterionDestroyed(code: string) {
        if (!!this.criterion[code]) {
            delete this.criterion[code];
            this.publishChange(new FilterService.Criteria(this.code, this.criterion));
        }
    }

    public initSubscriptions() {
        Observable.combineLatest(this.scope$, this.code$)
            .takeUntil(this.destroyed$)
            .filter(([scope, code]: [string, string]) => !!scope && !!code)
            .subscribe(([scope, code]: [string, string]) => this.namespace$.next([scope, code]));
    }

    public onDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        if (this.scope$) { this.scope$.complete(); }

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
        attrs.$observe('appFilterCriteriaProps', x => controller.code = x as string);

        filterScope
            .code$
            .takeUntil(controller.destroyed$)
            .subscribe(code => controller.scope$.next(code));

        controller.publishChange = (criteria: FilterService.ICriteria) => {
            filterScope.onCriteriaChanged({ code: criteria.code, criterion: criteria.criterion });
        };
        controller.initSubscriptions();

        // this.filter.reset$
        //     .takeUntil(controller.destroyed$)
        //     .subscribe(x => controller.reset$.next(x));

        scope.$on('$destroy', () => controller.onDestroy());
    }
}

export const module =
    angular.module('application.component.appFilterCriteriaProps', [])
        .directive('appFilterCriteriaProps', [
            'filterService',
            (filterService: FilterService.FilterService) => new Directive(filterService)
        ]);
