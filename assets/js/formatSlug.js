/**
 * @function formatSlug
 * @description formats any string input to be a URL slug friendly string.
 * Created 2/17/25 by Alexander Burdiss
 * @param {string} input The input string to format as a URL slug.
 * @returns {string} a-modified-version-of-the-input-string
 *
 * @copyright 2025 Alexander Burdiss
 * @since 2/17/25
 * @version 1.0.0
 * @example
 * `<a href="../about#${formatSlug(author.name)}">${author.name}</a>`
 */
function formatSlug(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
