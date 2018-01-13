
import * as angular from 'angular';

export class Directive {

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes) {
        if (!$(element).is(':checkbox')) { return; }

        attrs.$observe('indeterminate', x => {
            $(element).prop('indeterminate', x === 'true');
        });
    }
}

export const module =
    angular.module('application.components.indeterminate', [])
        .directive('indeterminate', () => new Directive());
