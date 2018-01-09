
import { Utils } from '../../../lib';
import { Action } from '@ngrx/store';

export const SET_APPLICATION_NAME = Utils.type('SET_APPLICATION_NAME');

export interface ISetApplicationName {
    name: string[];
}

export class SetApplicationName implements Action {
    constructor(public payload: ISetApplicationName) { }

    public type = SET_APPLICATION_NAME;
}
