
import * as angular from 'angular';

export class Controller { }

export const module =
    angular.module('application.views.appViewLayout', [])
        .component('appViewLayout', {
            controller: Controller,
            controllerAs: 'ctrl',
            template: `
            <!-- VIEW LAYOUT: BEGIN -->
            <app-view-layout-navigation></app-view-layout-navigation>
            <app-view-layout-content></app-view-layout-content>
            <!-- VIEW LAYOUT: END -->
            `
        });
