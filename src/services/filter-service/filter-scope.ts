
import { BehaviorSubject, Subject } from 'rxjs';
import { FilterService } from './filter-service';
import { Controller as CheckboxGroupPropsController } from './checkbox-group-props';
import { Controller as CriteriaPropsController } from './criteria-props';
import { ICriterion } from './criterion';

export interface IFilterScopeRegistrableController {
    all: boolean;
    some: boolean;
    reset(): void;
    setCriterion(criterion: ICriterion);
}

export class Controller {

    public static $inject = [
        'attHealthatworkCoreFilterService'
    ];

    constructor(
        private filterService: FilterService
    ) { }

    public scopeNameValue: string;

    public name$: BehaviorSubject<string> = new BehaviorSubject<string>(this.scopeNameValue);
    public get name(): string { return this.name$.getValue(); }
    public set name(value: string) { this.name$.next(value); }

    public destroyed$: Subject<boolean> = new Subject<boolean>();

    public registerController(controller: IFilterScopeRegistrableController, group: CheckboxGroupPropsController, criteria: CriteriaPropsController) {
        if (!controller) { throw new Error('Controller is undefined or null'); }

        if (!!group) {
            group.all$
                .takeUntil(this.destroyed$)
                .subscribe(x => controller.all = x);

            group.some$
                .takeUntil(this.destroyed$)
                .subscribe(x => controller.some = x);
        }

        if (!!criteria) {
            criteria.reset$
                .takeUntil(this.destroyed$)
                .filter(x => !!x)
                .filter(x => x === this.name)
                .subscribe(x => controller.reset());

            criteria.criterion$
                .takeUntil(this.destroyed$)
                .filter(x => !!x).subscribe(x => controller.setCriterion(x));
        }
    }

    public destroy() {
        this.filterService.destroyScope(this.name);

        this.name$.complete();

        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export class Directive implements angular.IDirective {

    public bindToController = true;
    public controller = Controller;
    public controllerAs = 'ctrl';
    public restrict = 'E';
    public transclude = true;
    public scope = { scopeNameValue: '@scopeName' };
    public template = `
    <div>
        <div data-ng-transclude></div>
    </div>
    `;

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, controller: Controller) {
        scope.$on('$destroy', event => controller.destroy());
    }
}

export const DirectiveFactory = () => new Directive();
