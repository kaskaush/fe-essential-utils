/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {*} func - function that will be called after specified wait
 * @param {*} wait - the amount of time to wait after last execution
 * @param {*} immediate - Fires the function first then instead of waiting until the end
 */
const debounce = function (func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments; // eslint-disable-line no-undef
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export const DebounceUtils = { debounce };
