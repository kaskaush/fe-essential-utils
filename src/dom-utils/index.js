/**
 * Smooth scrolls the page to top. Will jump to top where ever smooth scroll not avilable.
 *
 * @param {HTMLElement} node to which the page needs to be scrolled to (window by default)
 */
const scrollToTop = node => {
  const nodeToScroll = node || window;

  if (nodeToScroll.scroll) {
    nodeToScroll.scroll({ left: 0, top: 0, behavior: "smooth" });
  } else {
    nodeToScroll.scrollTop = 0;
  }
};

export { scrollToTop };
