
import { ICriterion, ICriterionIndexer } from './criterion';

export interface ICriteria {
    scope: string;
    name: string;
    items: ICriterionIndexer;

    setCriterion(criterion: ICriterion);
}

export class Criteria implements ICriteria {
    constructor(scope: string, name: string) {
        this.scope = scope;
        this.name = name;
    }

    public scope: string;
    public name: string;
    public items: ICriterionIndexer = {};

    public setCriterion(criterion: ICriterion) {
        this.items[criterion.name] = criterion;
    }
}
