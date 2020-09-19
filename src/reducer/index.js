import { combineReducers } from 'redux';
import { Action } from '../actions';

/**
 * Add New Url
 * @param {{url: string, name: string, visited: 0, dateCreated: number}[]} urls
 * @param {{ type: string, newUrl: { url: string, name: string, visited: 0, dateCreated: number } }} action
 * @returns {{url: string, name: string, visited: 0, dateCreated: number}[]}
 */
const addUrl = (urls = [], { type, newUrl }) => {
  if (type === Action.addUrl && typeof newUrl === 'object')
    return [...urls, newUrl];

  return urls;
};

/**
 * Remove old Url
 * @param {{url: string, name: string, visited: 0, dateCreated: number }[]} urls
 * @param {{ type: string, oldUrl: string }} action
 * @returns {{url: string, name: string, visited: 0, dateCreated: number }[]}
 */
const removeUrl = (urls = [], { type, oldUrl }) => {
  if (type === Action.removeUrl && typeof oldUrl === 'string')
    return urls.filter((url) => url.url !== oldUrl);

  return urls;
};

/**
 * Rename Url
 * @param {{url: string, name: string, visited: 0, dateCreated: number }[]} urls
 * @param {{ type: string, url: string, newName: string }} action
 * @returns {{url: string, name: string, visited: 0, dateCreated: number }[]}
 */
const renameUrl = (urls = [], { type, url, newName }) => {
  if (type === Action.renameUrl && typeof url === 'string')
    return urls.map((urlObj) => {
      if (urlObj.url === url) urlObj.name = newName;
      return urlObj;
    });
  return urls;
};

export default combineReducers({
  addUrl,
  removeUrl,
  renameUrl
});
