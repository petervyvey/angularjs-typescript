
import * as angular from 'angular';
import { Controller as CheckboxGroupProps } from './filter-checkbox-group-props.directive';
import { Controller as CriteriaPropsController } from './filter-criteria-props.directive';
import { FilterService } from '../../services';

export class Directive implements ng.IDirective {
    public restrict = 'A';
    public require = ['?ngModel', '?^appFilterCheckboxGroupProps'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [ngModel, group]: [angular.INgModelController, CheckboxGroupProps]) {
        if (!$(element).is(':checkbox')) { return; }

        if (!!ngModel && !!group) {
            group.registerModel(ngModel);
            ngModel.$viewChangeListeners.push(() => group.change$.next(ngModel));
            scope.$watch(() => ngModel.$modelValue, value => {
                if (value !== ngModel.$viewValue) {
                    ngModel.$setViewValue(value);
                    ngModel.$render();
                }

                group.change$.next(ngModel);
            });
        }

        scope.$on('$destroy', () => {
            group.unregisterModel(ngModel);
        });
    }
}

export const module =
    angular.module('application.component.appFilterCheckboxModel', [])
        .directive('appFilterCheckboxModel', () => new Directive());
