
export interface ICriterionIndexer {
    [name: string]: ICriterion;
}

export interface ICriterionOption {
    code: string;
    label: string;
}

/* tslint:disable:member-ordering */
export interface ICriterion {
    name: string;

    /* tslint:disable:no-any */
    value: any;
    /* tslint:enable:no-any */

    isActive: boolean;
}

export interface ITypedCriterion<TValue> extends ICriterion {
    value: TValue;
}

export class Criterion implements ICriterion {
    constructor(name: string) {
        this.name = name;
    }

    public name: string;

    /* tslint:disable:no-any */
    public value: any;
    /* tslint:enable:no-any */

    public get isActive(): boolean { return this.value !== undefined && this.value !== null && this.value !== false && this.value !== ''; }
}

export class TypedCriterion<TValue> extends Criterion implements ITypedCriterion<TValue> {
    constructor(name: string) {
        super(name);
    }

    public value: TValue;
}

export class StringCriterion extends TypedCriterion<string> {
    constructor(name: string, value: string) {
        super(name);
        this.value = value;
    }
}

export class BooleanCriterion extends TypedCriterion<boolean> {
    constructor(name: string, value: boolean) {
        super(name);
        this.value = value;
    }
}
