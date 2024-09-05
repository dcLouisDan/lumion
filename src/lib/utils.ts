import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

export const dayjsExtended = dayjs;
export enum Roles {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

export const bcrypt = require("bcryptjs");

export function groupObjectsByKey<T>(
  array: Array<T>,
  callback: (item: T) => string
) {
  const groupedArray: Record<string, Array<T>> = {};
  array.forEach((item) => {
    const key = callback(item);
    if (groupedArray.hasOwnProperty(key)) {
      groupedArray[key].push(item);
    } else {
      groupedArray[key] = [];
      groupedArray[key].push(item);
    }
  });

  return groupedArray;
}
