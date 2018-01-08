
import * as angular from 'angular';

export class Controller { }

export const module =
    angular.module('application.views.appViewLayoutContent', [])
        .component('appViewLayoutContent', {
            controller: Controller,
            controllerAs: 'ctrl',
            template: `
            <!-- VIEW LAYOUT CONTENT: BEGIN -->
            <div ui-view="content"></div>
            <!-- VIEW LAYOUT CONTENT: END -->
            `
        });
