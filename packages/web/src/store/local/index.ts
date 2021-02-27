/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { combineReducers } from 'redux';

import wholeApp from './wholeApp';
import transaction from './transaction';
import transactionFilter from './transactionFilter';

export default combineReducers({
    wholeApp,
    transaction,
    transactionFilter,
});
