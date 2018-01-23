
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

export class Controller {
    constructor() {
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

    public change$: BehaviorSubject<angular.INgModelController> = new BehaviorSubject<angular.INgModelController>(undefined);

    public toggleAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public all$: Observable<boolean> =
        this.change$
            .filter(x => !!x)
            .map(x => this.models.length > 0 && this.models.filter(m => m.$viewValue).length === this.models.length)
            .share();

    public some$: Observable<boolean> =
        this.change$
            .filter(x => !!x)
            .map(x => this.models.filter(m => m.$viewValue).length !== 0 && this.models.filter(m => m.$viewValue).length < this.models.length)
            .share();

    public indeterminate$: Observable<boolean> =
        Observable.combineLatest(this.some$, this.all$)
            .takeUntil(this.destroyed$)
            .map(([some, all]) => some && !all)
            .share();

    private models: angular.INgModelController[] = [];

    public registerModel(model: angular.INgModelController) {
        const index: number = this.models.indexOf(model);
        if (index === -1) { this.models.push(model); }
    }

    public unregisterModel(model: angular.INgModelController) {
        const index = this.models.indexOf(model);
        if (index !== -1) { this.models.splice(index, 1); }
    }

    public destroy() {
        this.change$.complete();
        this.toggleAll$.complete();

        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export class Directive implements ng.IDirective {
    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$appFilterCheckboxGroupProps';
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
