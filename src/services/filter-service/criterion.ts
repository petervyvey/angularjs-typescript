
export interface ICriterionIndexer {
    [name: string]: ICriterion;
}

export interface ICriterionOption {
    code: string;
    label: string;
}

/* tslint:disable:member-ordering */
export interface ICriterion {
    code: string;

    /* tslint:disable:no-any */
    value: any;
    /* tslint:enable:no-any */
}

export interface ITypedCriterion<TValue> extends ICriterion {
    value: TValue;
}

export class Criterion implements ICriterion {
    constructor(code: string) {
        this.code = code;
    }

    public code: string;

    /* tslint:disable:no-any */
    public value: any;
    /* tslint:enable:no-any */

    // public get isActive(): boolean { return this.value !== undefined && this.value !== null && this.value !== false && this.value !== ''; }
}

export class TypedCriterion<TValue> extends Criterion implements ITypedCriterion<TValue> {
    constructor(code: string) {
        super(code);
    }

    public value: TValue;
}

export class StringCriterion extends TypedCriterion<string> {
    constructor(code: string, value: string) {
        super(code);
        this.value = value;
    }
}

export class BooleanCriterion extends TypedCriterion<boolean> {
    constructor(code: string, value: boolean) {
        super(code);
        this.value = value;
    }
}
