
import * as angular from 'angular';

import template from './navigation.template.html';

export class Controller { }

export const module =
    angular.module('application.views.appViewLayoutNavigation', [])
        .component('appViewLayoutNavigation', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
