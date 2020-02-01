/* Browser utils */

/**
 * Checks if browser is Internet Explorer.
 *
 * @returns {boolean} true if IE else false
 */
const isIEBrowser = () => {
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
        return true;
    }

    return false;
};

/**
 * Checks if browser is Safari.
 *
 * @returns {boolean} true if Safari else false
 */
const isSafariBrowser = () => {
    return !!navigator && navigator.userAgent.indexOf('Safari') > -1;
};

/**
 * Checks if the device runs on iOS.
 *
 * @returns {boolean} true if iOS else false
 */
const isIos = () => {
    return !!navigator && /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const BrowserUtils = {
    isIEBrowser,
    isSafariBrowser,
    isIos
};
