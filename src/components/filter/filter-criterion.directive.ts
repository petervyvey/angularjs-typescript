
import * as angular from 'angular';
import { Controller as CheckboxGroupProps } from './filter-checkbox-group-props.directive';
import { Controller as CriteriaPropsController } from './filter-criteria-props.directive';
import { FilterService } from '../../services';

export class Controller {

    public publishChange: (criterion: FilterService.ICriterion) => void = angular.noop;

    public criterionChanged(criterion: FilterService.ICriterion) {
        this.publishChange(criterion);
    }
}

export class Directive implements ng.IDirective {
    public bindToController = true;
    public controller = Controller;
    public controllerAs = '$filterCriterion';
    public restrict = 'A';
    public require = ['appFilterCriterion', '^?appFilterCriteriaProps'];

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, [controller, criteria]: [Controller, CriteriaPropsController]) {

        controller.publishChange = (criterion: FilterService.ICriterion) => {
            criteria.onCriterionChanged(criterion);
        };
    }
}

export const module =
    angular.module('application.component.appFilterCriterion', [])
        .directive('appFilterCriterion', () => new Directive());
