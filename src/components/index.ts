
import * as angular from 'angular';

import * as Indeterminate from './indeterminate';
import * as SelectOnFocus from './select-on-focus';
import * as CountrySelector from './country-selector';
import * as TimeZoneSelector from './time-zone-selector';
import * as Filter from './filter';

const module =
    angular
        .module('application.components', [
            Indeterminate.module.name,
            SelectOnFocus.module.name,
            CountrySelector.module.name,
            TimeZoneSelector.module.name,
            Filter.module.name
        ]);

export {
    module,
    CountrySelector,
    TimeZoneSelector,
    SelectOnFocus
};
