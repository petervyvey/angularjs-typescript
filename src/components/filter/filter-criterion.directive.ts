
import * as angular from 'angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Controller as CheckboxGroupProps } from './filter-checkbox-group-props.directive';
import { Controller as CriteriaPropsController } from './filter-criteria-props.directive';
import { FilterService } from '../../services';

export class Controller {
    public static $inject = [
        'filterService'
    ];

    constructor(
        private filterService: FilterService.FilterService
    ) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);

        this.onInit();
    }

    public destroyed$: Subject<boolean> = new Subject<boolean>();
    public criterion$: Observable<FilterService.ICriterion>;
    public publishChange: (criterion: FilterService.ICriterion) => void = angular.noop;
    public publishDestroy: (code: string) => void = angular.noop;

    public namespace$: BehaviorSubject<[string, string]> = new BehaviorSubject<[string, string]>([undefined, undefined]);
    public get namespace(): [string, string] { return this.namespace$.value; }
    public set namespace(value: [string, string]) { this.namespace$.next(value); }

    public code$: BehaviorSubject<string>;
    public get code(): string {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        return this.code$.value;
    }
    public set code(value: string) {
        this.code$ = this.code$ || new BehaviorSubject<string>(undefined);
        this.code$.next(value);
    }

    public onInit() {
        this.criterion$ =
            Observable.combineLatest(this.filterService.scope$, this.namespace$, this.code$)
                .takeUntil(this.destroyed$)
                .debounceTime(10)
                .filter(([scope, namespace, code]) => !!scope && !!namespace && !!namespace[0] && !!namespace[1] && !!code)
                .filter(([scope, namespace, code]) => !!scope[namespace[0]] && !!scope[namespace[0]].criteria)
                .map(([scope, namespace, code]) => scope[namespace[0]].criteria[namespace[1]].criterion[code])
                .filter(criterion => !!criterion)
                .shareReplay(1);
    }

    public onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();

        this.destroyCriterion();
    }

    public changeCriterion(criterion: FilterService.ICriterion) {
        this.publishChange(criterion);
    }

    public destroyCriterion() {
        this.publishDestroy(this.code);
    }
}

export class Directive implements angular.IDirective {
    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$filterCriterion';
    public restrict = 'A';
    public require = ['appFilterCriterion', '^?appFilterCriteriaProps'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [controller, criteria]: [Controller, CriteriaPropsController]) {
        attrs.$observe('appFilterCriterion', x => controller.code = x as string);

        if (!!criteria) {
            criteria
                .namespace$
                .filter(([s, c]) => !!s && !!c)
                .subscribe(namespace => controller.namespace = namespace);

            controller.publishChange = (criterion: FilterService.ICriterion) => criteria.changeCriterion(criterion);
            controller.publishDestroy = (code: string) => criteria.destroyCriterion(code);
        }

        scope.$on('$destroy', event => {
            controller.onDestroy();
        });
    }
}

export const module =
    angular.module('application.component.appFilterCriterion', [])
        .directive('appFilterCriterion', () => new Directive());
