
import { BehaviorSubject, Subject, Observable } from 'rxjs';

import { IScope, Scope, IScopeIndexer } from './scope';
import { ICriteria, Criteria } from './criteria';

export interface ICriteriaEvent {
    scope: string;
    criteria: ICriteria;
}

export class FilterService {
    constructor() {
        this.criteria$.filter(x => !!x).subscribe(x => this.onChanged(x));
    }

    public scope: IScopeIndexer = {};

    public criteria$: BehaviorSubject<ICriteriaEvent> = new BehaviorSubject<ICriteriaEvent>(undefined);

    private onChanged(event: ICriteriaEvent) {
        if (!this.scope[event.scope]) {
            this.scope[event.scope] = new Scope(event.scope);
        }

        this.scope[event.scope].setCriteria(event.criteria);
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
