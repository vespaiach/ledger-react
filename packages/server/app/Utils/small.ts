/**
 * Ledger API Source Code.
 *
 * @license MIT
 * @copyright Toan Nguyen
 */

export function to2Decimal(number: number): number {
  return Math.round(number * 100) / 100
}
