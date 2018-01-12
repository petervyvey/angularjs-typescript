
import * as angular from 'angular';

import * as CheckboxGroupProps from './checkbox-group-props.directive';
import * as CriteriaProps from './criteria-props.directive';
import * as FilterScope from './filter-scope.directive';
import * as NgModel from './ng-model.directive';

export { CheckboxGroupProps, CriteriaProps, FilterScope, NgModel };

export const module =
    angular.module('application.components.filter', [
        CheckboxGroupProps.module.name,
        CriteriaProps.module.name,
        FilterScope.module.name,
        NgModel.module.name
    ]);
