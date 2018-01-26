
import { BehaviorSubject, Scheduler } from 'rxjs';

import { Dispatcher } from './dispatcher';
import { Reducer } from './reducer';
import { Observable } from 'rxjs/Observable';

export class State<T> extends BehaviorSubject<T> {
    constructor(initialState: T, action$: Dispatcher, reducer$: Reducer) {
        super(initialState);

        const actionInQueue$ = action$.observeOn(Scheduler.queue);
        const actionAndReducer$ = actionInQueue$.withLatestFrom(reducer$);
        const state$ = actionAndReducer$.scan((state, [action, reducer]) => {
            return reducer(state, action);
        }, initialState);

        state$.subscribe(value => this.next(value));
    }
}
