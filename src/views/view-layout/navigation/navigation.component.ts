
import * as angular from 'angular';

import { Body } from '../../body';

import template from './navigation.template.html';

export class Controller {
    public body: Body.Controller;
}

export const module =
    angular.module('application.views.appViewLayoutNavigation', [])
        .component('appViewLayoutNavigation', {
            controller: Controller,
            template,
            require: {
                body: '^^body'
            }
        });
