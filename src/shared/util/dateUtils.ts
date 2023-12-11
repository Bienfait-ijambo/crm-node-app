import { UpperCaseFirstLetter } from "./util";

export function dateToIsoString(val: string) {
  const date = new Date(val);
  const isoDate = date.toISOString().slice(0, 10);
  return isoDate;
}

/**
 *
 * @returns today date in English format
 */
export function todayDate() {
  const date = new Date();
  return date.toISOString().slice(0, 10);
}

/**
 * covert date to french format
 */
export function dateEngToFr(val: string) {
  const date = new Date(val);
  return date.toLocaleDateString("Fr");
}

export function formatDate(date: string) {
  if (date !== "" && typeof date !== "undefined") {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    const formatedDate = new Date(date).toLocaleDateString("Fr", dateOptions);
    return UpperCaseFirstLetter(formatedDate);
  } else {
    return "";
  }
}

export function getDateDifference(startDate: string, endDate: string) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const diffInMilliseconds = date2.getTime() - date1.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return diffInDays;
}

export function disablePastDate(el: HTMLInputElement) {
  const dtToday = new Date();
  let month = (dtToday.getMonth() + 1).toString();
  let day = dtToday.getDate().toString();
  const year = dtToday.getFullYear();

  // Ensure single-digit month and day are formatted without leading zeros
  if (month.length === 1) month = "0" + month;
  if (day.length === 1) day = "0" + day;

  const maxDate = `${year}-${month}-${day}`;

  // const input = document.querySelector(el) as HTMLInputElement;
  // input.setAttribute('min', maxDate);

  const input = el as HTMLInputElement;
  input.setAttribute("min", maxDate);
}

export function ISstartDateIsGreaterThanEndDate(
  startDate: string,
  endDate: string
) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  return date1.getTime() > date2.getTime() ? true : false;
}

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
