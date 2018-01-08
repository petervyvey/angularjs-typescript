
import * as angular from 'angular';

import { module as NgRx } from '../lib/ngrx';
import { StoreProvider } from '@ngrx/ng';

import * as TimeZoneState from './time-zone';

const module =
    angular.module('application.store', [
        NgRx.name
    ])
        .config(['storeProvider', (storeProvider: StoreProvider) => {

            storeProvider.setReducer({
                TimeZone: TimeZoneState.Reducer
            });

            storeProvider.setInitialState({
                TimeZone: {
                    timeZones: []
                }
            });
        }
        ]);

// tslint:disable-next-line:interface-name
interface State {
    TimeZone: TimeZoneState.IState;
}

export {
    module,
    State,
    TimeZoneState
};
