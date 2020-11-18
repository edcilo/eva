/**
 * Converts a number into currency format
 *
 * @param {number} value
 * @param {string} locale
 * @param {string} currency
 * @param {integer} minimumFractionDigits
 *
 * @returns string
 */
export default function currency(
  value: number,
  locale = "es-MX",
  currency = "MXN",
  minimumFractionDigits = 2
) {
  const style = "currency";

  return value.toLocaleString(locale, {
    style,
    currency,
    minimumFractionDigits
  });
}
