
import { Reducer } from './reducer';
import { Dispatcher } from './dispatcher';
import { Store } from './store';
import { State } from './state';
import { combineReducers } from './utils';

export class StoreFactory {
    public static create(reducer: any, initState?: any) {
        const dispatcher = this.dispatcherFactory();

        const initialReducer = this.initialReducerFactory(reducer);
        const initialState = this.initialStateFactory(initState, initialReducer);

        const actualReducer = this.reducerFactory(Dispatcher, initialReducer);
        const actualState = this.stateFactory(initialState, dispatcher, actualReducer);

        return this.storeFactory(dispatcher, actualReducer, actualState);
    }

    private static storeFactory(dispatcher, reducer, state$) {
        return new Store(dispatcher, reducer, state$);
    }

    private static dispatcherFactory() {
        return new Dispatcher();
    }

    private static initialStateFactory(initialState, reducer) {
        if (!initialState) {
            return reducer(undefined, { type: Dispatcher.INIT });
        }
        return initialState;
    }

    private static initialReducerFactory(reducer) {
        if (typeof reducer === 'function') {
            return reducer;
        }
        return combineReducers(reducer);
    }

    private static stateFactory(initialState: any, dispatcher: Dispatcher, reducer: Reducer) {
        return new State(initialState, dispatcher, reducer);
    }

    private static reducerFactory(dispatcher, reducer) {
        return new Reducer(dispatcher, reducer);
    }
}
