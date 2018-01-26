
import { select, SelectSignature } from './../core';
import { Observer, Observable, Operator } from 'rxjs';

import { Action } from './dispatcher';
import { ActionReducer } from './reducer';

export class Store<T> extends Observable<T> implements Observer<Action> {

    constructor(
        private $dispatcher: Observer<Action>,
        private $reducer: Observer<ActionReducer<any>>,
        private state$: Observable<any>
    ) {
        super();

        this.source = state$;
    }

    public select: SelectSignature<T> = select.bind(this);

    public lift<R>(operator: Operator<T, R>): Store<R> {
        const store = new Store<R>(this.$dispatcher, this.$reducer, this);
        store.operator = operator;
        return store;
    }

    public replaceReducer(reducer: ActionReducer<any>) {
        this.$reducer.next(reducer);
    }

    public dispatch(action: Action) {
        this.$dispatcher.next(action);
    }

    public next(action: Action) {
        this.$dispatcher.next(action);
    }

    public error(err: any) {
        this.$dispatcher.error(err);
    }

    public complete() {
        // noop
    }
}
