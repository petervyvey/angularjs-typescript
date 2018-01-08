
import * as angular from 'angular';

export class Controller { }

export const module =
    angular.module('application.views.body', [])
        .component('body', {
            controller: Controller,
            controllerAs: 'app',
            template: `
            <!-- BODY: BEGIN -->
            <app-view-layout></app-view-layout>
            <!-- BODY: END -->
            `
        });
