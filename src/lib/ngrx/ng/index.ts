import * as angular from 'angular';
import { Store, StoreFactory } from './../store';

export const NAME = 'ngrx1-ng';

export class StoreProvider implements ng.IServiceProvider {
    private reducer = {};
    private initialState = null;
    private store: Store<any> = null;

    // Configuration function
    public setReducer(reducer: any) {
        this.reducer = reducer;
    }

    public setInitialState(initialState: any) {
        this.initialState = initialState;
    }

    // Provider's factory function
    public $get(): Store<any> {
        this.store = this.store || StoreFactory.create(this.reducer, this.initialState);
        return this.store;
    }
}

const module =
    angular.module(NAME, [])
        .provider('store', StoreProvider);

export { module };
