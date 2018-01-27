
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

        this.initSubscriptions();

    }

    public destroyed$: Subject<boolean> = new Subject<boolean>();
    public reset$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    public scope$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    public namespace$: BehaviorSubject<[string, string]> = new BehaviorSubject<[string, string]>([undefined, undefined]);
    public criterion: FilterService.ICriterionIndexer = {};
    public notifyChange: (criteria: FilterService.ICriteria) => void = angular.noop;
    public notifyDestroy: (code: string) => void = angular.noop;

    public code$: BehaviorSubject<string>;
    public get code(): string {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        return this.code$.value;
    }
    public set code(value: string) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        this.code$.next(value);
    }

    public changeCriterion(criterion: FilterService.ICriterion) {
        this.criterion[criterion.code] = criterion;
        this.notifyChange(new FilterService.Criteria(this.code, this.criterion));
    }

    public destroyCriterion(code: string) {
        if (!!this.criterion[code]) {
            delete this.criterion[code];
            this.notifyChange(new FilterService.Criteria(this.code, this.criterion));
        }
    }

    public destroyCriteria() {
        this.notifyDestroy(this.code);
    }

    public initSubscriptions() {
        Observable.combineLatest(this.scope$, this.code$)
            .takeUntil(this.destroyed$)
            .filter(([scope, code]: [string, string]) => !!scope && !!code)
            .subscribe(([scope, code]: [string, string]) => this.namespace$.next([scope, code]));

        Observable.combineLatest(this.filterService.scope$, this.namespace$, this.code$)
            .takeUntil(this.destroyed$)
            .debounceTime(10)
            .filter(([scope, namespace, code]) => !!scope && !!namespace && !!namespace[0] && !!namespace[1] && !!code)
            .filter(([scope, namespace, code]) => !!scope[namespace[0]] && !!scope[namespace[0]].criteria)
            .do(([scope, namespace, code]) => this.criterion = scope[namespace[0]].criteria[namespace[1]].criterion)
            .subscribe();
    }

    public onDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        if (this.scope$) { this.scope$.complete(); }

        this.reset$.complete();

        this.destroyCriteria();
    }
}

export class Directive implements ng.IDirective {
    constructor(private filter: FilterService.FilterService) { }

    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$appFilterCriteria';
    public restrict = 'A';
    public require = ['appFilterCriteria', '^appFilterScope'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [controller, filterScope]: [Controller, FilterScopeController]) {
        attrs.$observe('appFilterCriteria', x => controller.code = x as string);

        filterScope
            .code$
            .takeUntil(controller.destroyed$)
            .subscribe(code => controller.scope$.next(code));

        controller.notifyChange = (criteria: FilterService.ICriteria) => filterScope.changeCriteria({ code: criteria.code, criterion: criteria.criterion });
        controller.notifyDestroy = (code: string) => filterScope.destroyCriteria(code);

        // this.filter.reset$
        //     .takeUntil(controller.destroyed$)
        //     .subscribe(x => controller.reset$.next(x));

        scope.$on('$destroy', () => controller.onDestroy());
    }
}

export const module =
    angular.module('application.component.appFilterCriteria', [])
        .directive('appFilterCriteria', [
            'filterService',
            (filterService: FilterService.FilterService) => new Directive(filterService)
        ]);
