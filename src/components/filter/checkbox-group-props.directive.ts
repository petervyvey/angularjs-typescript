
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

export class Controller {
    constructor() {
        console.log('checkbox-group-props', this);

        this.models$.filter(x => !!x)
            .takeUntil(this.destroyed$)
            .subscribe(x => {
                const index: number = this.models.indexOf(x);
                if (index === -1) { this.models.push(x); }
            });

        this.unregister$.filter(x => !!x)
            .takeUntil(this.destroyed$)
            .subscribe(x => {
                const index = this.models.indexOf(x);
                if (index !== -1) {
                    this.models.splice(index, 1);
                }
            });

        this.toggleAll$
            .takeUntil(this.destroyed$)
            .subscribe(x => {
                this.models.forEach(model => {
                    model.$setViewValue(x);
                    model.$render();
                });
            });
    }

    private destroyed$: Subject<boolean> = new Subject<boolean>();

    public models$: BehaviorSubject<angular.INgModelController> = new BehaviorSubject<angular.INgModelController>(undefined);
    public unregister$: BehaviorSubject<angular.INgModelController> = new BehaviorSubject<angular.INgModelController>(undefined);
    public change$: BehaviorSubject<angular.INgModelController> = new BehaviorSubject<angular.INgModelController>(undefined);
    public checked$: BehaviorSubject<{ name: string, checked: boolean }> = new BehaviorSubject<{ name: string, checked: boolean }>(undefined);
    public toggleAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public all$: Observable<boolean> =
        this.change$.filter(x => !!x)
            .scan((r: number, model: angular.INgModelController) => r + (model.$viewValue ? 1 : -1), 0)
            .map(x => this.models.length === x)
            .share();

    public some$: Observable<boolean> =
        this.change$.filter(x => !!x)
            .scan((r: number, model: angular.INgModelController) => r + (model.$viewValue ? 1 : -1), 0)
            .map(x => x !== 0 && this.models.length !== x)
            .share();

    private models: angular.INgModelController[] = [];

    public destroy() {
        this.models$.complete();
        this.change$.complete();
        this.toggleAll$.complete();

        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export class Directive implements ng.IDirective {
    public bindToController = true;
    public controller = Controller;
    public controllerAs = 'ctrl';
    public restrict = 'A';

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, ctrl: Controller) {
        scope.$on('$destroy', () => ctrl.destroy());
    }
}

export const module =
    angular.module('application.component.appFilterCheckboxGroupProps', [])
        .directive('appFilterCheckboxGroupProps', () => new Directive());
