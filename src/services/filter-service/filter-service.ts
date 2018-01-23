
import * as angular from 'angular';
import { StateService } from '@uirouter/angularjs';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { IScope, Scope, IScopeIndexer } from './scope';
import { ICriteriaIndexer, Criteria } from './criteria';
import { ICriterion, StringCriterion, BooleanCriterion, ICriterionIndexer } from './criterion';
import { QueryParamsService } from '../query-params-service';
import { ICriteria } from '@services/filter-service';

export class FilterService {
    constructor(
        private $timeout: angular.ITimeoutService,
        private $state: StateService,
        private queryParamsService: QueryParamsService
    ) {
        this.onInit();
    }

    public scope: IScopeIndexer = {};

    public scope$: BehaviorSubject<IScopeIndexer> = new BehaviorSubject<IScopeIndexer>(undefined);

    public queryParams$: Observable<string[]>;

    public onInit() {
        this.queryParamsService
            .current$
            .map(params => params.filter)
            .filter(filter => !!filter)
            .subscribe((filter: string | string[]) => {
                const scopes: { [name: string]: IScope } = {};

                filter = Array.isArray(filter) ? filter : [filter];
                for (const item of filter) {
                    const [path, type, value] = item.split(':');
                    const [scopeCode, criteriaCode, criterionCode] = path.split('.');

                    let criterion: ICriterion;
                    switch (type) {
                        case 'string':
                            criterion = new StringCriterion(criterionCode, value);
                            break;

                        case 'boolean':
                            criterion = new BooleanCriterion(criterionCode, value === 'true' ? true : false);
                            break;

                        default:
                            break;
                    }

                    if (!scopes[scopeCode]) { scopes[scopeCode] = new Scope(scopeCode); }
                    if (!scopes[scopeCode].criteria[criteriaCode]) { scopes[scopeCode].criteria[criteriaCode] = new Criteria(criteriaCode); }
                    if (!scopes[scopeCode].criteria[criteriaCode].criterion[criterionCode]) { scopes[scopeCode].criteria[criteriaCode].criterion[criterionCode] = criterion; }

                    for (const scope in scopes) {
                        if (scopes.hasOwnProperty(scope)) {
                            this.onScopeChanged(scopes[scope]);
                        }
                    }
                }
            });

        this.queryParams$ =
            this.scope$
                .filter(scopes => !!scopes)
                .debounceTime(100)
                .map(scopes => this.buildScopeNamespaces(scopes))
                .share();

        this.queryParams$
            .filter(params => !!params)
            .debounceTime(10)
            .subscribe(params =>
                this.$timeout(() =>
                    this.$state.go(this.$state.$current.name, angular.extend(this.$state.params, { filter: params }))
                )
            );
    }

    public onScopeChanged(scope: IScope) {
        if (!scope || !!scope && !scope.code) {
            throw new Error('Scope code is empty/null/undefined.');
        }

        this.scope[scope.code] = scope;
        this.scope$.next(this.scope);

        console.log('onScopeChanged', this.scope$.value);
    }

    private buildScopeNamespaces(scopes: IScopeIndexer): string[] {
        const params: string[] = [];

        const namespaces: string[] = [];
        for (const name in scopes) {
            if (!!scopes.hasOwnProperty(name)) {
                namespaces.push(name);
                const criteria = scopes[name].criteria;
                params.push(...this.buildCriteriaNamespaces(namespaces, criteria));
            }
        }

        return params;
    }

    private buildCriteriaNamespaces(scopes: string[], indexable: ICriteriaIndexer): string[] {
        const params: string[] = [];

        const namespaces: string[] = [];
        for (const property in indexable) {
            if (!!indexable.hasOwnProperty(property)) {
                scopes.forEach(scope => namespaces.push(`${scope}.${property}`));

                const criterion = indexable[property].criterion;
                params.push(...this.buildCriterionNamespaces(namespaces, criterion));
            }
        }

        return params;
    }

    private buildCriterionNamespaces(namespaces: string[], indexable: ICriterionIndexer): string[] {
        const params: string[] = [];

        for (const property in indexable) {
            if (!!indexable.hasOwnProperty(property)) {
                const value: string = indexable[property].value;
                params.push(...this.createCriterionParam(namespaces, indexable, property, value));
            }
        }

        return params;
    }

    private createCriterionParam(criteriaSet: string[], criterion: ICriterionIndexer, property: string, value: string): string[] {
        const params: string[] = [];

        let type: string;
        if (criterion[property] instanceof BooleanCriterion) {
            type = 'boolean';
        }

        criteriaSet.forEach(criteria => params.push(`${criteria}.${property}:${type}:${value}`));

        return params;
    }
}
