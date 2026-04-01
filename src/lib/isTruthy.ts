/* eslint-disable @typescript-eslint/no-explicit-any */
export function isTruthy(value: any) {
  return value === true || value === 'true' || value === '1';
}