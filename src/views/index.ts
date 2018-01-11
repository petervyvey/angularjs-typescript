
import * as angular from 'angular';

// Import dependencies.
import { module as Components } from '../components';

// Import VIEW components.
import { Body } from './body';
import { Home, State as HomeState } from './home';
import { ViewLayout, Content, Navigation } from './view-layout';
import { TimeZone, Master, Detail, State as TimeZoneState } from './time-zone';
import { Population, State as PopulationState } from './population';

// Create module and add dependencies.
const module =
    angular.module('application.views', [
        Components.name,
        Body.module.name,
        Home.module.name,
        ViewLayout.module.name,
        Navigation.module.name,
        Content.module.name,
        TimeZone.module.name,
        Master.module.name,
        Detail.module.name,
        Population.module.name
    ])
        .config(HomeState.config)
        .config(TimeZoneState.config)
        .config(PopulationState.config)
        ;

export {
    module,
    ViewLayout,
    Content,
    Navigation,
    Home,
    TimeZone
};
