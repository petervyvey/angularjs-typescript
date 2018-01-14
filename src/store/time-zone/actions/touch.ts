
import { Action } from '@ngrx/store';
import { Utils } from '../../../lib';

export const TOUCH = Utils.type('TOUCH');

export class Touch implements Action {
    public payload: {};
    public type = TOUCH;
}
