
import * as angular from 'angular';

import { module as NgRx } from '../lib/ngrx';
import { StoreProvider } from '@ngrx/ng';

import * as ApplicationState from './application';
import * as TimeZoneState from './time-zone';

import * as Environment from '../application.environment';
import * as Constants from '../application.constants';

const module =
    angular.module('application.store', [
        NgRx.name,
        Constants.module.name,
        Environment.module.name
    ])
        .config([
            'storeProvider',
            'APPLICATION_NAME',
            'APPLICATION_VERSION',
            (
                storeProvider: StoreProvider,
                APPLICATION_NAME: string,
                APPLICATION_VERSION: string
            ) => {

                storeProvider.setReducer({
                    Application: ApplicationState.Reducer,
                    TimeZone: TimeZoneState.Reducer
                });

                storeProvider.setInitialState({
                    Application: {
                        name: APPLICATION_NAME,
                        version: APPLICATION_VERSION
                    },

                    TimeZone: {
                        timeZones: []
                    }
                });
            }
        ]);

// tslint:disable-next-line:interface-name
interface State {
    Application: ApplicationState.IState;
    TimeZone: TimeZoneState.IState;
}

export {
    module,
    State,
    ApplicationState,
    TimeZoneState
};
