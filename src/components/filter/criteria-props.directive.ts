
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterService } from '../../services';

export class Controller {

    constructor() {
        console.log('criteria-props', this);
    }
    public criterion$: BehaviorSubject<FilterService.ICriterion> = new BehaviorSubject<FilterService.ICriterion>(undefined);
    public reset$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    public destroyed$: Subject<boolean> = new Subject<boolean>();

    public destroy(): void {
        this.criterion$.complete();
        this.reset$.complete();

        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export class Directive implements ng.IDirective {
    constructor(private filter: FilterService.FilterService) { }

    public bindToController = true;
    public controller = Controller;
    public controllerAs = 'ctrl';
    public restrict = 'A';

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, controller: Controller) {
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
