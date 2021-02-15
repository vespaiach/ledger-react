/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

import { getToken } from '../../utils/token';

/**
 * Add authorization header if credentials is not set to 'omit'
 */
export default function attachBearer(config) {
    if (config.credentials === 'omit') {
        return config;
    }

    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
}
