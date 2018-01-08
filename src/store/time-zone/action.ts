
import { type } from '../type';

import { Response } from '@services/time-zone-db-store';
import * as Action from './actions';

type Actions
    = Action.SetTimeZones
    | Action.AddTimeZone
    ;

export { Actions, Action };
