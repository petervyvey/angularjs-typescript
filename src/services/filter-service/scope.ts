
import { Observable, Subject } from 'rxjs';

import { ICriteria, ICriteriaIndexer } from './criteria';

export interface IScopeIndexer {
    [name: string]: IScope;
}

export interface IScope {
    code: string;
    criteria: ICriteriaIndexer;
}

export class Scope implements IScope {
    constructor(public code: string, public criteria: ICriteriaIndexer = {}) { }
}
