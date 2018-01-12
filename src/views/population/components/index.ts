
import * as angular from 'angular';

import * as Filter from './filter.component';
import * as LanguageFilter from './language-filter.component';
import * as LanguageCheckbox from './language-checkbox.component';

export { Filter, LanguageFilter, LanguageCheckbox };

export const module =
    angular.module('application.views.populate.components', [
        Filter.module.name,
        LanguageFilter.module.name,
        LanguageCheckbox.module.name
    ]);
