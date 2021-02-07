/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { combineReducers } from 'redux';

import common from './common';
import transaction from './transaction';

export default combineReducers({
    common,
    transaction,
});
