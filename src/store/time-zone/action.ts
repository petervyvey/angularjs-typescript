
import { Utils } from '../../lib';

import { Response } from '@services/time-zone-db-store';
import * as Action from './actions';

type Actions
    = Action.SetCountries
    | Action.SetTimeZones
    | Action.AddTimeZone
    ;

export { Actions, Action };
