
import * as angular from 'angular';
import { Controller as CheckboxGroupProps } from './checkbox-group-props.directive';
import { Controller as CriteriaPropsController } from './criteria-props.directive';

export class Directive implements ng.IDirective {
    public restrict = 'A';
    public require = ['?ngModel', '?^appFilterCheckboxGroupProps', '^?appFilterCriteriaProps'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [controller, group, criteria]: [angular.INgModelController, CheckboxGroupProps, CriteriaPropsController]) {
        console.log('link', element);
        console.log('link.controller', controller);
        console.log('link.group', group);
        console.log('link.criteria', criteria);

        if (!$(element).is(':checkbox')) { return; }

        if (group) {
            group.models$.next(controller);
            controller.$viewChangeListeners.push(() => {
                group.change$.next(controller);
                console.log('value', controller.$modelValue);
            });
        }

        scope.$on('$destroy', () => {
            group.unregister$.next(controller);
        });
    }
}

export const module =
    angular.module('application.component.appFilterCriterion', [])
        .directive('appFilterCriterion', () => new Directive());
