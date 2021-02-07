import { combineReducers } from 'redux';

import common from './common';
import transaction from './transaction';

export default combineReducers({
    common,
    transaction,
});
