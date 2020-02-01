/* DOM utilities */

const bodyElement = document && document.getElementsByTagName('body')[0];
/**
 * Smooth scrolls the page to top. Will jump to top where ever smooth scroll not avilable.
 *
 * @param {HTMLElement} node to which the page needs to be scrolled to (window by default)
 */
const scrollToTop = node => {
    const nodeToScroll = node || window;

    if (nodeToScroll.scroll) {
        nodeToScroll.scroll({ left: 0, top: 0, behavior: 'smooth' });
    } else {
        nodeToScroll.scrollTop = 0;
    }
};

/**
 * Creates a new div element node and adds to document with given id.
 *
 * @param {string} nodeId id for the element
 * @param {string} className for css classes
 * @returns true if node already exists with given id or adds a new node
 */
const injectPortalContainer = (nodeId, className) => {
    const el = document.createElement('div');

    el.setAttribute('id', nodeId);
    el.setAttribute('class', className);
    const doesNodeExist = document.getElementById(nodeId);

    return doesNodeExist || document.body.appendChild(el);
};

/**
 * Checks if given element is in viewport.
 *
 * @param {HTMLElement} element element to check
 * @returns {boolean} true if present else false
 */
const isElementInViewport = element => {
    const rect = element.getBoundingClientRect();
    const html = document.documentElement;

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || html.clientHeight) &&
        rect.right <= (window.innerWidth || html.clientWidth)
    );
};

/**
 * Checks if an element is completely out of viewport.
 *
 * @param {HTMLElement} element element to check
 * @returns {boolean} true if out else false
 */
const isElementOutOfViewport = element => {
    const rect = element.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);

    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

/**
 * Freezes the body of the page.
 *
 */
const freezeBody = () => {
    if (bodyElement) {
        bodyElement.style.overflow = 'hidden';
    }
};

/**
 * Relaxes the body of the page.
 *
 */
const relaxBody = () => {
    if (bodyElement) {
        bodyElement.style.overflow = '';
    }
};

export const DOMUtils = {
    scrollToTop,
    injectPortalContainer,
    isElementInViewport,
    isElementOutOfViewport,
    freezeBody,
    relaxBody
};
