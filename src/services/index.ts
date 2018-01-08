
import * as angular from 'angular';

import * as QueryParams from './query-params-service';
import * as TimeZoneDB from './time-zone-db-store';

const module =
    angular.module('application.services', [
        QueryParams.module.name,
        TimeZoneDB.module.name
    ]);

export {
    module,
    QueryParams,
    TimeZoneDB
};
