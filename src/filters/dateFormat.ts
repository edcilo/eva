import { format } from "date-fns";

export default function dateFormat(
  value: string,
  parseTo = "Y-MM-dd hh:mm:ss a"
): string {
  return format(new Date(value), parseTo);
}
