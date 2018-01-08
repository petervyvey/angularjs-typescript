
import * as angular from 'angular';

import template from './home.template.html';

export class Controller { }

export const module =
    angular.module('application.views.appViewHome', [])
        .component('appViewHome', {
            controller: Controller,
            controllerAs: 'ctrl',
            template
        });
