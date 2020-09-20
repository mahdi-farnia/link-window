import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { renameLink, removeFromLibrary } from '../actions';
import Favicon from './LibraryItemFavicon';

const classLists = {
  renameLinkFocused: 'rename-link-focused'
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
        target='_blank'
        rel='noopener noreferrer'
        className='url-name'
        ref={linkEl}
      >
        {name || 'NO NAME'}
      </a>
      <div className='link-item__option'>
        <span
          className='rename'
          title='Rename Link'
          onClick={() => {
            linkEl.current.contentEditable = true;
            linkEl.current.focus();
            // Selects Content
            const range = document.createRange(),
              select = window.getSelection();
            range.selectNodeContents(linkEl.current);
            select.removeAllRanges();
            select.addRange(range);
            //
            itemEl.current.classList.add(classLists.renameLinkFocused);
            linkEl.current.addEventListener('keydown', function (e) {
              if (e.which === 13 || e.key === 'Enter') {
                e.preventDefault();
                this.blur();
              }
            });
            linkEl.current.addEventListener('blur', () => {
              itemEl.current.classList.remove(classLists.renameLinkFocused);
              linkEl.current.contentEditable = false;
              dispatch(
                renameLink(linkEl.current.href, linkEl.current.textContent)
              );
            });
          }}
        ></span>
        <span className='delete' title='Delete Link' onClick={() => {}}></span>
      </div>
    </li>
  );
}

React.memo(LibraryItem);
