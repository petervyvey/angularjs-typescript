
import * as angular from 'angular';

import template from './country-selector.template.html';
import { ICountryInfo } from './country-info';

export class Controller {

    public countries: ICountryInfo[];

    public current: string;

    private $selected: ICountryInfo;
    public get selected(): ICountryInfo { return this.$selected; }
    public set selected(value: ICountryInfo) {
        this.$selected = value;
        this.current = !!this.selected ? this.selected.name : null;
    }

    public isCollapsed: boolean = true;

    public options = {
        debounce: {
            default: 250,
            blur: 100
        }
    };

    // tslint:disable-next-line:variable-name
    public onSelectionChanged: ({ $args: ICountryInfo }) => void;

    public exact($item, $model, $label, $event) {
        if (!!this.onSelectionChanged) {
            this.onSelectionChanged({ $args: $item });
        }
    }
}

export const module =
    angular.module('application.component.appCountrySelector', [])
        .component('appCountrySelector', {
            controller: [Controller],
            controllerAs: 'ctrl',
            template,
            bindings: {
                countries: '<',
                selected: '<selectedCountry',
                onSelectionChanged: '&'
            }
        });
