"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = exports.ISstartDateIsGreaterThanEndDate = exports.disablePastDate = exports.getDateDifference = exports.formatDate = exports.dateEngToFr = exports.todayDate = exports.dateToIsoString = void 0;
const util_1 = require("./util");
function dateToIsoString(val) {
    const date = new Date(val);
    const isoDate = date.toISOString().slice(0, 10);
    return isoDate;
}
exports.dateToIsoString = dateToIsoString;
/**
 *
 * @returns today date in English format
 */
function todayDate() {
    const date = new Date();
    return date.toISOString().slice(0, 10);
}
exports.todayDate = todayDate;
/**
 * covert date to french format
 */
function dateEngToFr(val) {
    const date = new Date(val);
    return date.toLocaleDateString('Fr');
}
exports.dateEngToFr = dateEngToFr;
function formatDate(date) {
    if (typeof date !== 'object') {
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        const formatedDate = new Date(date).toLocaleDateString('Fr', dateOptions);
        return (0, util_1.UpperCaseFirstLetter)(formatedDate);
    }
    else {
        return '';
    }
}
exports.formatDate = formatDate;
function getDateDifference(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    return diffInDays;
}
exports.getDateDifference = getDateDifference;
function disablePastDate(el) {
    const dtToday = new Date();
    let month = (dtToday.getMonth() + 1).toString();
    let day = dtToday.getDate().toString();
    const year = dtToday.getFullYear();
    // Ensure single-digit month and day are formatted without leading zeros
    if (month.length === 1)
        month = '0' + month;
    if (day.length === 1)
        day = '0' + day;
    const maxDate = `${year}-${month}-${day}`;
    // const input = document.querySelector(el) as HTMLInputElement;
    // input.setAttribute('min', maxDate);
    const input = el;
    input.setAttribute('min', maxDate);
}
exports.disablePastDate = disablePastDate;
function ISstartDateIsGreaterThanEndDate(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    return date1.getTime() > date2.getTime() ? true : false;
}
exports.ISstartDateIsGreaterThanEndDate = ISstartDateIsGreaterThanEndDate;
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
}
exports.isValidDate = isValidDate;
//# sourceMappingURL=dateUtils.js.map