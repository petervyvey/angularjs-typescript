
import { ICriterion, ICriterionIndexer } from './criterion';

export interface ICriteriaIndexer {
    [name: string]: ICriteria;
}

export interface ICriteria {
    name: string;
    criterion: ICriterionIndexer;

    setCriterion(criterion: ICriterion);
}

export class Criteria implements ICriteria {
    constructor(name: string) {
        this.name = name;
    }

    public name: string;
    public criterion: ICriterionIndexer = {};

    public setCriterion(criterion: ICriterion) {
        this.criterion[criterion.name] = criterion;
    }
}
