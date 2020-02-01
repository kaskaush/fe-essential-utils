/* DOM utilities */

class DomUtils {
    /**
     * Smooth scrolls the page to top. Will jump to top where ever smooth scroll not avilable.
     *
     * @param {HTMLElement} node to which the page needs to be scrolled to (window by default)
     */
    scrollToTop = node => {
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
    injectPortalContainer = (nodeId, className) => {
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
    isElementInViewport = element => {
        const rect = element.getBoundingClientRect();
        const html = document.documentElement;

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
    };
}

export default new DomUtils();
