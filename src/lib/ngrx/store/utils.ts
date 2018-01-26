
import { ActionReducer } from './reducer';

export function combineReducers(reducers: any): ActionReducer<any> {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};

    for (const key of reducerKeys) {
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key];
        }
    }

    const finalReducerKeys = Object.keys(finalReducers);

    return (state = {}, action) => {
        let hasChanged = false;
        const nextState = {};

        for (const key of finalReducerKeys) {
            const reducer = finalReducers[key];
            const previousStateForKey = state[key];
            const nextStateForKey = reducer(previousStateForKey, action);

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }

        return hasChanged ? nextState : state;
    };
}
