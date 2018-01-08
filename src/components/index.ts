
import * as angular from 'angular';

import * as SelectOnFocus from './select-on-focus';
import * as CountrySelector from './country-selector';
import * as TimeZoneSelector from './time-zone-selector';

const module =
    angular
        .module('application.components', [
            SelectOnFocus.module.name,
            CountrySelector.module.name,
            TimeZoneSelector.module.name
        ]);

export {
    module,
    CountrySelector,
    TimeZoneSelector,
    SelectOnFocus
};
