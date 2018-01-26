
import * as angular from 'angular';

import { FilterService } from './filter-service';
import { ICriteria, ICriteriaIndexer, Criteria } from './criteria';
import { ICriterionOption, ICriterion, ITypedCriterion, Criterion, TypedCriterion, BooleanCriterion, StringCriterion, ICriterionIndexer } from './criterion';

// import { DirectiveFactory as FilterScope, Controller as FilterScopeController, IFilterScopeRegistrableController } from './filter-scope';
// import { DirectiveFactory as FilterCheckboxGroupProps, Controller as CheckboxGroupPropsController } from './checkbox-group-props';
// import { DirectiveFactory as ilterCriteriaProps, Controller as CriteriaPropsController } from './criteria-props';
// import { DirectiveFactory as NgModel } from './ng-model';

const module = angular.module('application.services.filterService', [])
    .service('filterService', FilterService)
    // .directive('appFilterScope', FilterScope)
    // .directive('appFilterCheckboxGroupProps', FilterCheckboxGroupProps)
    // .directive('appFilterCriteriaProps', ilterCriteriaProps)
    // .directive('appFilterCriterion', NgModel)
    ;

export {
    module,
    FilterService,
    ICriteria, ICriteriaIndexer, Criteria,
    ICriterionOption, ICriterionIndexer, ICriterion, ITypedCriterion, Criterion, TypedCriterion, BooleanCriterion, StringCriterion,
    // FilterScopeController,
    // IFilterScopeRegistrableController,
    // CriteriaPropsController,
    // CheckboxGroupPropsController
};
