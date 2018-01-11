
import { Controller as CheckboxGroupProps } from './checkbox-group-props';

export class Directive implements ng.IDirective {
    public restrict = 'A';
    public require = ['?ngModel', '?^attHealthatworkCoreFilterCheckboxGroupProps'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [controller, group]: [angular.INgModelController, CheckboxGroupProps]) {
        if (!element.is(':checkbox')) { return; }

        if (group) {
            group.models$.next(controller);
            controller.$viewChangeListeners.push(() => {
                group.change$.next(controller);
            });
        }

        scope.$on('$destroy', () => {
            group.unregister$.next(controller);
        });
    }
}

export const DirectiveFactory = [() => new Directive()];
