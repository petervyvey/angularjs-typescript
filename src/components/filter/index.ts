
import * as angular from 'angular';

import * as CheckboxGroupProps from './checkbox-group-props.directive';
import * as CriteriaProps from './criteria-props.directive';
import * as FilterScope from './filter-scope.directive';
import * as CheckboxCriterion from './checkbox-criterion.directive';

export { CheckboxGroupProps, CriteriaProps, FilterScope, CheckboxCriterion };

export const module =
    angular.module('application.components.filter', [
        CheckboxGroupProps.module.name,
        CriteriaProps.module.name,
        FilterScope.module.name,
        CheckboxCriterion.module.name
    ]);
