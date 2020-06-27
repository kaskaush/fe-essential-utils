/* Accessibility utils */
let state = { cursor: 0 };
let searchStr = '';

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: (search, rawPos) => {
            let pos = rawPos > 0 ? rawPos | 0 : 0;
            return this.substring(pos, pos + search.length) === search;
        },
    });
}
/**
 * Focus trap utility to maintain focus with in the given root element.
 *
 * @param {HTML element} rootElement to maintain focus in
 * @param {object} event events
 */
const focusTrap = (rootElement, event) => {
    if (rootElement) {
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
    }
};

/**
 * Resets the cursor for dropdown navigation.
 *
 */
const resetDropdownCursor = () => {
    state.cursor = 0;
};

/**
 * Handle dropdown navigation accessibility for custom dropdowns.
 *
 * @param {object} event key event
 * @param {HTMLElement} rootElement the parent element of focusable items
 * @param {string} elementsToFocus focusable elements (comma separated)
 * @param {function} closeCb close callback on esc key
 * @returns
 */
const dropDownNavigation = (event, rootElement, elementsToFocus, closeCb) => {
    let focusableEls = rootElement.querySelectorAll(elementsToFocus);

    // Searches for data starting with characters [0-9a-z]
    if (event.keyCode >= 48 && event.keyCode <= 90) {
        searchStr += event.key;
        let index = Array.from(focusableEls).findIndex((el) => {
            return el.innerHTML.toLowerCase().startsWith(searchStr.toLowerCase()) && el;
        });

        state.cursor = index >= 0 && index;
        focusableEls[state.cursor] && focusableEls[state.cursor].focus();
        // Clear the string after a timeout. Similar to that of native dropdown.
        setTimeout(() => {
            searchStr = '';
        }, 100);
        return;
    }

    // Closes the dropdown on esc key
    if (event.keyCode === 27) {
        closeCb(event);
    }

    // Maintain state even on tabbing
    if (event.keyCode === 9) {
        if (event.shiftKey) {
            state.cursor -= 1;
        } else {
            state.cursor += 1;
        }
    }

    // Navigates up
    if (event.keyCode === 38 && state.cursor > 0) {
        state.cursor -= 1;
        focusableEls[state.cursor] && focusableEls[state.cursor].focus();
    } else if (event.keyCode === 40 && state.cursor < focusableEls.length - 1) {
        // Navigates down
        state.cursor += 1;
        focusableEls[state.cursor] && focusableEls[state.cursor].focus();
    }

    if (event.keyCode === 38 || event.keyCode === 40) {
        event.preventDefault();
    }
};

export const AccessibilityUtils = {
    focusTrap,
    resetDropdownCursor,
    dropDownNavigation,
};
