/**
 *
 * Ledger Web App Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen <nta.toan@gmail.com>
 *
 */

/**
 * Try to clear client cache storage.
 *
 * @param {string} key
 * @returns {Promise<void>}
 */
export const clearCacheStorage = (key) => caches.delete(key);
