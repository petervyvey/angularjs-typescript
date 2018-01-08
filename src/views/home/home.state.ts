
import * as angular from 'angular';
import '@uirouter/angularjs';

export const config = [
    '$stateProvider',
    (
        $stateProvider: angular.ui.IStateProvider
    ) => {
        $stateProvider
            .state('application.home', {
                url: '/home',
                views: {
                    'content@': {
                        template: '<app-view-home></app-view-home>'
                    }
                }
            });
    }
];
