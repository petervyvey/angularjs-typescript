
import { Utils } from '../../lib';

import { Response } from '@services/time-zone-db-store';
import * as Action from './actions';

type Actions
    = Action.SetCountries
    | Action.SelectCountry
    | Action.SetTimeZoneExtraInfo
    | Action.SelectTimeZone
    ;

export { Actions, Action };
