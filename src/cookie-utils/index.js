/* Cookie utilities */

const BACK_DATED_EXPIRY = 'Thu, 01 Jan 1970 00:00:00 GMT';
/**
 * Returns a cookie value based on given key.
 *
 * @param {string} key key name of the cookie
 * @returns {string} the value if present else empty string
 */
const getCookie = key => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const cookieSet = document.cookie.split('; ');
        const cookieArray = cookieSet.filter(cookie => cookie.indexOf(`${key}=`) === 0);
        const cookie = cookieArray[0];

        return cookie
            ? cookie.split(`${key}=`)[1] !== ''
                ? cookie
                      .split(`${key}=`)[1]
                      .replace(/(^[,\s]+)|([,\s]+$)/g, '')
                      .split(',')[0]
                : ''
            : '';
    }

    return '';
};

/**
 * Delete a cookie based on given key.
 *
 * @param {string} key key name of the cookie
 * @param {string} domain (optional) domain of the cookie (if needs to be deleted on a specific domain)
 * @returns {boolean} returns true once the cookie is deleted | returns false if code renders server side
 */
const deleteCookie = (key, domain = '') => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const newCookie = `${key}=;path=/;expires=${BACK_DATED_EXPIRY};${domain !== '' ? `domain=${domain};` : ''}`;

        document.cookie = newCookie;
        return true;
    }

    return false;
};

/**
 * Create a cookie
 *
 * @param {string} key key name of the cookie
 * @param {any} value value that needs to be given to the cookie
 * @param {number} expiryDays number of days from now the cookie should expire (default - 90)
 * @param {string} domain (optional) if needs to be set on a specific domain
 * @returns {boolean} true - once the cookie is created | false - if code renders server side
 */
const createCookie = (key, value, expiryDays = 90, domain = '') => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const currentDate = new Date();
        const expiryDate = new Date(currentDate.getTime() + expiryDays * 24 * 60 * 60 * 1000);
        const newCookie = `${key}=${value}; path = /;expires=${expiryDate};${domain !== '' ? `domain=${domain};` : ''}`;

        document.cookie = newCookie;
        return true;
    }

    return false;
};

/**
 * Creates a session cookie with no default expire date. Will be deleted once the browser is closed.
 *
 * @param {string} key key name of the cookie
 * @param {any} value value that needs to be given to the cookie
 * @param {string} domain (optional) if needs to be set on a specific domain
 */

const createSessionCookie = (key, value, domain = '') => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const newCookie = `${key}=${value};path = /;${domain !== '' ? `domain=${domain};` : ''}`;

        document.cookie = newCookie;
        return true;
    }

    return false;
};

export { createCookie, getCookie, deleteCookie, createSessionCookie };
