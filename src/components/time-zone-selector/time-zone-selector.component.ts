
import * as angular from 'angular';
import { BehaviorSubject, Subject } from 'rxjs';

import { ITimeZoneInfo } from './time-zone-info';

import template from './time-zone-selector.template.html';
import { val } from '@uirouter/angularjs';

export class Controller {
    private destroyed$: Subject<boolean> = new Subject<boolean>();

    private timeZones$: BehaviorSubject<ITimeZoneInfo[]> = new BehaviorSubject<ITimeZoneInfo[]>(undefined);
    public get timeZones(): ITimeZoneInfo[] { return this.timeZones$.value; }
    public set timeZones(value: ITimeZoneInfo[]) { this.timeZones$.next(value); }

    private selected$: BehaviorSubject<ITimeZoneInfo> = new BehaviorSubject<ITimeZoneInfo>(undefined);
    public get selected(): ITimeZoneInfo { return this.selected$.value; }
    public set selected(value: ITimeZoneInfo) { this.selected$.next(value); }

    public isCollapsed: boolean = true;

    // tslint:disable-next-line:variable-name
    public onSelectionChanged: ({ $args: ICountryInfo }) => void;

    public $onInit() {
        // this.timeZones$
        //     .takeUntil(this.destroyed$)
        //     .filter(x => !!x && x.length > 0)
        //     .subscribe(x => this.selected = x[0]);

        this.selected$
            .takeUntil(this.destroyed$)
            .filter(x => !!x)
            .subscribe(x => {
                if (!!this.onSelectionChanged) {
                    this.onSelectionChanged({ $args: x });
                }
            });
    }

    public $onDestroy() {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

export const module =
    angular.module('application.component.appTimeZoneSelector', [])
        .component('appTimeZoneSelector', {
            controller: [Controller],
            controllerAs: 'ctrl',
            template,
            bindings: {
                timeZones: '<',
                selected: '<selectedTimeZone',
                onSelectionChanged: '&'
            }
        });
