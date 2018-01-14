
import { ICriterion, ICriterionIndexer } from './criterion';

export interface ICriteriaIndexer {
    [name: string]: ICriteria;
}

export interface ICriteria {
    code: string;
    criterion: ICriterionIndexer;
}

export class Criteria implements ICriteria {
    constructor(public code: string, public criterion: ICriterionIndexer = {}) { }
}
