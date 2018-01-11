
import * as angular from 'angular';

import * as FilterService from './filter-service';
import * as QueryParams from './query-params-service';
import * as TimeZoneDB from './time-zone-db-store';

const module =
    angular.module('application.services', [
        FilterService.module.name,
        QueryParams.module.name,
        TimeZoneDB.module.name
    ]);

export {
    module,
    FilterService,
    QueryParams,
    TimeZoneDB
};
