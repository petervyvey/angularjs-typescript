
import * as angular from 'angular';

import * as Filter from './filter.component';
import * as LanguageFilter from './language-filter.component';
import * as Language from './language.component';

export { Filter, LanguageFilter, Language };

export const module =
    angular.module('application.views.populate.components', [
        Filter.module.name,
        LanguageFilter.module.name,
        Language.module.name
    ]);
