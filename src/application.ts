
import * as angular from 'angular';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import 'core-js';
import 'angular-route';
import '@uirouter/core';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';
import 'angular1-async-filter';

import * as Environment from './application.environment';
import * as Constants from './application.constants';
import * as Services from './services';
import * as Store from './store';
import * as Components from './components';
import * as Views from './views';
import './application.style.scss';

const module =
    angular.module('application', [
        'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'asyncFilter',
        Environment.module.name,
        Constants.module.name,
        Services.module.name,
        Components.module.name,
        Store.module.name,
        Views.module.name,
    ])
        .config(['$locationProvider', '$routeProvider', ($locationProvider: angular.ILocationProvider, $routeProvider: angular.route.IRouteProvider) => {
            $locationProvider
                .hashPrefix('');

            $routeProvider
                .when(
                '/', {
                    redirectTo: '/home'
                })
                ;
        }])
        .config(['$stateProvider', ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider
                .state('application', {
                    url: '',
                    abstract: true
                });
        }])
        .config(['timeZoneDBStoreProvider', 'TIME_ZONE_DB_API_KEY', (timeZoneDbServiceProvider: Services.TimeZoneDB.TimeZoneDBStoreProvider, TIME_ZONE_DB_API_KEY: string) => {
            timeZoneDbServiceProvider.configure({ apiKey: TIME_ZONE_DB_API_KEY });
        }])
    ;

export {
    module
};
