/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */
import humps from 'humps';

/**
 * Convert response from snake case to camel case
 */
export default function toCamelCase(config) {
    if (config.data !== null && typeof config.data === 'object') {
        config.data = humps.camelizeKeys(config.data);
    }

    return config;
}
