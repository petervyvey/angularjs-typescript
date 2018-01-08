
import { BehaviorSubject } from 'rxjs';

// tslint:disable-next-line:interface-name
export interface Action {
    type: string;
    payload?: any;
}

export class Dispatcher extends BehaviorSubject<Action> {
    public static INIT = '@ngrx1/store/init';

    constructor() {
        super({ type: Dispatcher.INIT });
    }

    public dispatch(action: Action): void {
        this.next(action);
    }

    public complete() {
        // noop
    }
}