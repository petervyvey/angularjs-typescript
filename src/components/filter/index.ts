
import * as angular from 'angular';

import * as FilterCheckboxGroup from './filter-checkbox-group.directive';
import * as FilterCheckboxModel from './filter-checkbox-model.directive';
import * as FilterCriteria from './filter-criteria.directive';
import * as FilterScope from './filter-scope.directive';
import * as FilterCriterion from './filter-criterion.directive';

export { FilterCheckboxGroup, FilterCriteria, FilterScope, FilterCriterion };

export const module =
    angular.module('application.components.filter', [
        FilterCheckboxGroup.module.name,
        FilterCheckboxModel.module.name,
        FilterCriteria.module.name,
        FilterScope.module.name,
        FilterCriterion.module.name
    ]);
