
import { BehaviorSubject } from 'rxjs';
import { Dispatcher, Action } from './dispatcher';

export type ActionReducer<T> = (state: T, action: Action) => T;

export class Reducer extends BehaviorSubject<ActionReducer<any>> {
    public static REPLACE = '@ngrx1/store/replace-reducer';

    constructor(private dispatcher: Dispatcher, initialReducer: ActionReducer<any>) {
        super(initialReducer);
    }

    public replaceReducer(reducer: ActionReducer<any>) {
        this.next(reducer);
    }

    public next(reducer: ActionReducer<any>) {
        super.next(reducer);
        this.dispatcher.dispatch({ type: Reducer.REPLACE });
    }
}
