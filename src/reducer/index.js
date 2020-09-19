import { combineReducers } from 'redux';
import { Action } from '../actions';

const url = (urlObjects = [], action) => {
  switch (action.type) {
    case Action.addUrl:
      return [...urlObjects, action.newUrl];
    case Action.removeUrl:
      return urlObjects.filter((url) => url.url !== action.oldUrl);
    case Action.renameUrl:
      return urlObjects.map((urlObj) => {
        if (urlObj.url === action.url) urlObj.name = action.newName;
        return urlObj;
      });
    default:
      return urlObjects;
  }
};

export default combineReducers({
  url
});
