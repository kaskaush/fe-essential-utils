/* Accessibility utils */

/**
 * Focus trap utility to maintain focus with in the given root element.
 *
 * @param {HTML element} rootElement to maintain focus in
 * @param {object} event events
 */
const focusTrap = (rootElement, event) => {
    if (event.keyCode === 9) {
        let focusableEls = rootElement.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        );
        if (focusableEls[focusableEls.length - 1] === event.target) {
            event.preventDefault();
            focusableEls[0].focus();
        } else if (event.shiftKey && focusableEls[0] === event.target) {
            event.preventDefault();
            focusableEls[focusableEls.length - 1].focus();
        }
    }
};

export const AccessibilityUtils = {
    focusTrap
};
