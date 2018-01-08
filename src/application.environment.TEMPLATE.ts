
import * as angular from 'angular';

const module =
    angular
        .module('application.environment', [])
        .constant('TIME_ZONE_DB_API_KEY', 'YOUR_API_KEY_HERE')
        .constant('APPLICATION_VERSION', '0.0.1')
    ;

export { module };
