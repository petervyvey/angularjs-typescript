
import { Action } from '@ngrx/store';
import { Utils } from '../../../lib';

export const REFRESH = Utils.type('REFRESH');

export class Refresh implements Action {
    public payload: {};
    public type = REFRESH;
}
