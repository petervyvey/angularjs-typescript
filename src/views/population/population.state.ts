
import * as angular from 'angular';
import { StateProvider } from '@uirouter/angularjs';

export const config = [
    '$stateProvider',
    (
        $stateProvider: StateProvider
    ) => {
        $stateProvider
            .state('application.population', {
                url: '/population?filter',
                views: {
                    'content@': {
                        template: '<app-view-population></app-view-population>'
                    }
                }
            });
    }
];
