/**
 * Converts a string into Capitalize
 *
 * @param string value
 * @returns string
 */
export default function capitalize(value: string): string {
  if (value.length === 0) {
    return "";
  }

  value = value.toString();

  return value.charAt(0).toUpperCase() + value.slice(1);
}
