/**
 *
 * @param path
 * @returns {boolean}
 */
function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export default {
  isExternal,
};
