
import { Observable, Subject } from 'rxjs';

import { ICriteria, ICriteriaIndexer } from './criteria';

export interface IScopeIndexer {
    [name: string]: IScope;
}

export interface IScope {
    name: string;
    criteria: ICriteriaIndexer;
    reset$: Subject<string>;

    setCriteria(criteria: ICriteria);
}

export class Scope implements IScope {
    constructor(name: string) {
        this.name = name;
    }

    public name: string;
    public criteria: ICriteriaIndexer = {};
    public reset$: Subject<any> = new Subject<any>();

    public setCriteria(criteria: ICriteria) {
        this.criteria[criteria.name] = criteria;
    }
}
