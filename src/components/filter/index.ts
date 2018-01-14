
import * as angular from 'angular';

import * as FilterCheckboxGroupProps from './filter-checkbox-group-props.directive';
import * as FilterCheckboxModel from './filter-checkbox-model.directive';
import * as FilterCriteriaProps from './filter-criteria-props.directive';
import * as FilterScope from './filter-scope.directive';
import * as FilterCriterion from './filter-criterion.directive';

export { FilterCheckboxGroupProps, FilterCriteriaProps, FilterScope, FilterCriterion };

export const module =
    angular.module('application.components.filter', [
        FilterCheckboxGroupProps.module.name,
        FilterCheckboxModel.module.name,
        FilterCriteriaProps.module.name,
        FilterScope.module.name,
        FilterCriterion.module.name
    ]);
