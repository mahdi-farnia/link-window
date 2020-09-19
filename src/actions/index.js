// Types Goes Here
export const Action = {
  addToLibrary: 'ADD_TO_LIBRARY',
  removeFromLibrary: 'REMOVE_FROM_LIBRARY',
  renameLink: 'RENAME_LINK'
};

/**
 * @param {{url: string, name: string, visited: 0, dateCreated: number}} newLink
 */
export function addToLibrary(newLink) {
  return {
    type: Action.addToLibrary,
    newLink
  };
}

/**
 * @param {string} oldLinkUrl
 */
export function removeFromLibrary(oldLinkUrl) {
  return {
    type: Action.removeFromLibrary,
    oldLinkUrl
  };
}

/**
 * @param {string} linkUrl
 * @param {string} newLinkName
 */
export function renameLink(linkUrl, newLinkName) {
  return {
    type: Action.renameLink,
    linkUrl,
    newLinkName
  };
}
