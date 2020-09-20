import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { renameLink, removeFromLibrary } from '../actions';
import Favicon from './LibraryItemFavicon';

const classLists = {
  renameLinkFocused: 'rename-link-focused',
  deleteLink: 'delete-link'
};

export default function LibraryItem({ name, url }) {
  // Use Loading Favicon First
  const itemEl = useRef(null),
    linkEl = useRef(null),
    [icon, setIcon] = useState({ src: '', isLoading: true }),
    // If Image Not Loaded Use Name Instead
    textIcon = name[0] + name[1],
    redirectUrl = /https:\/\/|http:\/\//.exec(url + '') ? url : 'http://' + url,
    requestUrl = new URL(redirectUrl).hostname,
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        // Get Favicon Url
        const json = await fetch(
          `http://favicongrabber.com/api/grab/${requestUrl}`
        ).then((res) => res.json());

        if (json.icons) {
          const iconObj =
            json.icons.find((icon) => icon.type === 'image/x-icon') ||
            json.icons.find((icon) => icon.type === 'image/png');
          // Getting Icon
          setIcon({ src: iconObj.src, isLoading: false });
        } else setIcon({ src: '', isLoading: false });
      } catch (err) {
        setIcon({ src: '', isLoading: false });
      }
    })();
  }, [requestUrl]);

  return (
    <li title={name || 'NO NAME'} ref={itemEl}>
      <Favicon icon={icon} textIcon={textIcon} />
      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="url-name"
        ref={linkEl}
      >
        {name || 'NO NAME'}
      </a>
      <div className="link-item__option">
        <span
          className="rename"
          title="Rename Link"
          onClick={() => {
            const anchor = linkEl.current;
            anchor.contentEditable = true;
            anchor.focus();
            // Selects Content
            const range = document.createRange(),
              select = window.getSelection();
            range.selectNodeContents(anchor);
            select.removeAllRanges();
            select.addRange(range);
            //
            itemEl.current.classList.add(classLists.renameLinkFocused);
            const prevName = anchor.textContent;
            anchor.addEventListener('keydown', function (e) {
              if (e.which === 13 || e.key === 'Enter') {
                e.preventDefault();
                this.blur();
              }
            });
            anchor.addEventListener('blur', () => {
              const newName = anchor.textContent;
              anchor.contentEditable = false;
              itemEl.current.classList.remove(classLists.renameLinkFocused);
              if (!newName.trim()) {
                alert('This is not a valid name');
                anchor.textContent = prevName;
                return;
              }
              dispatch(renameLink(anchor.href, newName));
            });
          }}
        ></span>
        <span
          className="delete"
          title="Delete Link"
          onClick={() => {
            const anchor = linkEl.current,
              deleteModal = window.confirm('Are you sure?');
            if (!deleteModal) return;
            itemEl.current.classList.add(classLists.deleteLink);
            itemEl.current.addEventListener('animationend', () => {
              dispatch(removeFromLibrary(anchor.href));
            });
          }}
        ></span>
      </div>
    </li>
  );
}

React.memo(LibraryItem);
