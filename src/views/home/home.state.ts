
import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

export const config = [
    '$stateProvider',
    (
        $stateProvider: StateProvider
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
