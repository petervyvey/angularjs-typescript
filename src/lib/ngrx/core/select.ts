
import { Observable } from 'rxjs';

export interface SelectSignature<T> {
    <R>(...paths: string[]): Observable<R>;
    <R>(mapFn: (state: T) => R): Observable<R>;
}

export function select<T, R>(pathOrMapFn: any, ...paths: string[]): Observable<R> {
    let mapped$: Observable<R>;

    if (typeof pathOrMapFn === 'string') {
        mapped$ = this.pluck(pathOrMapFn, ...paths);
    } else if (typeof pathOrMapFn === 'function') {
        mapped$ = this.map(pathOrMapFn);
    } else {
        throw new TypeError(`Unexpected type ${typeof pathOrMapFn} in select operator,`
            + ` expected 'string' or 'function'`);
    }

    return mapped$.distinctUntilChanged();
}
