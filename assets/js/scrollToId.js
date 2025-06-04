/**
 * @function scrollToId
 * @description This function will handle scrolling the window to the ID after
 * the page part with the ID has been built out, since many IDs on this site
 * rely on a fetch request to return.
 * Cretaed 2/17/25 by Alexander Burdiss
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/17/25
 * @version 1.0.0
 * @example scrollToId();
 */
function scrollToId() {
  const hash = window.location.hash;
  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
