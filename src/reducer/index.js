import { combineReducers } from 'redux';
import { Action } from '../actions';

const links = (Links = [], action) => {
  switch (action.type) {
    case Action.addToLibrary:
      return [...Links, action.newLink];
    case Action.removeFromLibrary:
      return Links.filter((link) => link.url !== action.oldLinkUrl);
    case Action.renameLink:
      return Links.map((link) => {
        if (link.url === action.linkUrl) link.name = action.newLinkName;
        return link;
      });
    default:
      return Links;
  }
};

export default combineReducers({
  links
});
