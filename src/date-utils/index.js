/**
 * Converts given string date into date object.
 *
 * @param {string} date input date in string format
 * @param {string} [format='y-m-d'] optional format for the given date
 * @returns date object
 */
const convertToDateObject = (date, format = 'y-m-d') => {
    const dateArray = date.split(/[:/.TZ-]/g);
    const formatArray = format.split(/[:/.TZ-]/g);
    const y = dateArray[formatArray.indexOf('y')];
    const m = dateArray[formatArray.indexOf('m')];
    const d = dateArray[formatArray.indexOf('d')];

    return new Date(y, m - 1, d);
};

/**
 * Converts given date object to date string.
 *
 * @param {Date} date input date object
 * @param {string} [format='y-m-d'] optional date format for the given date object
 * @returns stringified date
 */
const convertToDateString = (date, format = 'y-m-d') => {
    let datearray = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    datearray = datearray.map((val) => (val < 10 ? `0${val}` : val));
    format = String(format).toLowerCase();
    return format.replace(/[ymdhis]/g, (letter) => datearray['ymdhis'.indexOf(letter)]);
};

/**
 * Converts given date from one format to another.
 *
 * @param {string} date input date
 * @param {string} [format1='y-m-d'] format of given date
 * @param {string} [format2='y-m-d'] format to convert to
 * @returns date as per given new format
 */
const convertDateFormats = (date, format1 = 'y-m-d', format2 = 'y-m-d') => {
    if (!date) return '';
    const inputDateArr = date.split(/[:/.TZ-]/g);
    const formatArr = format1.split(/[:/.TZ-]/g);
    const dateMap = {
        y: inputDateArr[formatArr.indexOf('y')],
        m: inputDateArr[formatArr.indexOf('m')],
        d: inputDateArr[formatArr.indexOf('d')],
    };
    let requiredFormatArr = format2.split(/[:/.TZ-]/g);
    const formatter = format2.charAt(1);

    requiredFormatArr = requiredFormatArr.map((item) => dateMap[item]);
    return requiredFormatArr.join(formatter);
};

/**
 * Returns number of days between the given dates.
 *
 * @param {string} first from date
 * @param {string} second to date
 * @param {string} [format='y-m-d'] date format
 * @returns number of days in between
 */
const getDaysDifference = (first, second, format = 'y-m-d') => {
    const firstDate = convertToDateObject(first, format);
    const secondDate = convertToDateObject(second, format);

    return Math.round((secondDate.valueOf() - firstDate.valueOf()) / (1000 * 60 * 60 * 24));
};

/**
 * Checks if a given date is present between the start and end dates.
 *
 * @param dateToCheck date to check
 * @param startDate start date
 * @param endDate end date
 * @returns {boolean} true if present else false
 */
const isDateInBetween = (dateToCheck, startDate, endDate) => {
    let isValidDate = Date.parse(dateToCheck);
    return (
        isValidDate &&
        new Date(dateToCheck).getTime() <= new Date(endDate).getTime() &&
        new Date(dateToCheck).getTime() >= new Date(startDate).getTime()
    );
};

export const DateUtils = {
    convertToDateObject,
    convertToDateString,
    convertDateFormats,
    getDaysDifference,
    isDateInBetween,
};
