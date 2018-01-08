
import * as angular from 'angular';

export class Directive implements angular.IDirective {
    public require = ['?ngModel'];
    public restrict = 'A';

    public compile() {
        return this.link.bind(this);
    }

    public link(scope: angular.IScope, element: angular.IAugmentedJQuery, attrs: angular.IAttributes, controller: angular.INgModelController) {
        if (!controller) { return; }

        const onClick = event => {
            $(element).select();
        };

        element.on('click', onClick);

        scope.$on('$destroy', () => {
            $(element).off('click', onClick);
        });
    }
}

export const module =
    angular.module('application.component.appSelectOnFocus', [])
        .directive('appSelectOnFocus', () => new Directive());
