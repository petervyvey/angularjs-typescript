
import * as angular from 'angular';
import '@uirouter/angularjs';

export const config = [
    '$stateProvider',
    (
        $stateProvider: angular.ui.IStateProvider
    ) => {
        $stateProvider
            .state('application.timezone', {
                url: '/timezone?country&timezone&filter',
                params: {
                    country: {
                        value: '',
                        squash: true
                    },
                    timezone: {
                        value: '',
                        squash: true
                    },
                    filter: {
                        value: '',
                        squash: true
                    }
                },
                reloadOnSearch: false,
                views: {
                    'content@': {
                        template: '<app-view-time-zone></app-view-time-zone>'
                    }
                }
            });
    }
];
