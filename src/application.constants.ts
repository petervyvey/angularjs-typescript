
import * as angular from 'angular';

const module =
    angular
        .module('application.constants', [])
        .constant('APPLICATION_NAME', 'AngularJS + TypeScript')
    ;

export { module };
