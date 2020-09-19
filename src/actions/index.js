// Types Goes Here
export const Action = {
  addUrl: 'ADD_URL',
  removeUrl: 'REMOVE_URL',
  renameUrl: 'RENAME_URL'
};

/**
 * @param {{url: string, name: string, visited: 0, dateCreated: number}} newUrl
 */
export function addUrl(newUrl) {
  return {
    type: Action.addUrl,
    newUrl
  };
}

/**
 * @param {string} oldUrl
 */
export function removeUrl(oldUrl) {
  return {
    type: Action.removeUrl,
    oldUrl
  };
}

/**
 * @param {string} url
 * @param {string} newName
 */
export function renameUrl(url, newName) {
  return {
    type: Action.renameUrl,
    url,
    newName
  };
}
