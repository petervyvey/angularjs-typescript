
import * as angular from 'angular';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { IScope, Scope, IScopeIndexer } from './scope';
import { StateService } from '@uirouter/angularjs';

export class FilterService {
    constructor(
        private $timeout: angular.ITimeoutService,
        private $state: StateService
    ) {
        this.onInit();
    }

    public scope: IScopeIndexer = {};

    public scope$: BehaviorSubject<IScope> = new BehaviorSubject<IScope>(undefined);

    public onInit() {
        console.log('service', this);
        this.scope$
            .filter(scope => !!scope)
            .debounceTime(100)
            .subscribe(scope =>
                this.$timeout(() =>
                    this.$state.go(this.$state.$current.name, angular.extend(this.$state.params, { filter: 'test' }))
                )
            );
    }

    public onScopeChanged(scope: IScope) {
        if (!scope || !!scope && !scope.code) {
            throw new Error('Scope code is empty/null/undefined.');
        }

        this.scope[scope.code] = scope;
        this.scope$.next(scope);
    }

    // public reset$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

    // public criteria$: BehaviorSubject<ICriteria> = new BehaviorSubject<ICriteria>(undefined);
    // public filter$: Observable<ICriteria[]> =
    //     Observable
    //         .combineLatest(this.criteria$)
    //         .map(() => {
    //             return this.items;
    //         })
    //         .share();

    // public scopedCriteria(scope: string): ICriteria[] {
    //     return this.items.filter(x => x.scope === name);
    // }

    // public scoped$(scopeName: string): Observable<ICriteria[]> {
    //     let scope: IScopeReference_DEPRECATED | IScopeReference_DEPRECATED[] = this.scopes_DEPRECATED.filter(x => x.name === scopeName);
    //     if (scope.length > 0) {
    //         scope = scope[0];
    //     } else {
    //         scope = null;
    //     }

    //     if (!scope) {
    //         scope = {
    //             name: scopeName,
    //             observable:
    //                 Observable
    //                     .combineLatest(this.criteria$)
    //                     .map(() => {
    //                         return this.items.filter(x => x.scope === scopeName);
    //                     })
    //                     .share()
    //         };

    //         this.scopes_DEPRECATED.push(scope);
    //     }

    //     return (scope as IScopeReference_DEPRECATED).observable;
    // }

    // public active$(scopeName: string): Observable<boolean> {
    //     return this.scoped$(scopeName)
    //         .map((x: ICriteria[]) => {
    //             let isActive: boolean = false;
    //             x.forEach(criteria => {
    //                 for (const criterion in criteria.items) {
    //                     if (criteria.items.hasOwnProperty(criterion)) {
    //                         isActive = isActive || criteria.items[criterion].isActive;
    //                     }
    //                 }
    //             });

    //             return isActive;
    //         })
    //         .share();
    // }

    // public destroyScope(scopeName: string) {
    //     let scope: IScopeReference_DEPRECATED | IScopeReference_DEPRECATED[] = this.scopes_DEPRECATED.filter(x => x.name === scopeName);
    //     if (scope.length > 0) {
    //         scope = scope[0];
    //         const index = this.scopes_DEPRECATED.indexOf(scope);
    //         this.scopes_DEPRECATED.splice(index, 1);
    //     }
    // }

    // private setCriteria(criteria: ICriteria) {
    //     const index: number = this.items.indexOf(criteria);
    //     if (index === -1) {
    //         this.items.push(criteria);
    //     } else {
    //         this.items[index] = criteria;
    //     }
    // }
}
