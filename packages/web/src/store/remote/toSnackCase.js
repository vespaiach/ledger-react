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
export default function toSnackCase(config) {
    if (config.data !== null && typeof config.data === 'object') {
        config.data = humps.decamelizeKeys(config.data);
        config.params = humps.decamelizeKeys(config.params);
    }

    return config;
}
