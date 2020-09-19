import React, { useEffect, useState } from 'react';
import loadingFavicon from '../assets/loading.svg';

export default function LibraryItem({ name, url }) {
  // Use Loading Favicon First
  const [icon, setIcon] = useState({ src: loadingFavicon, isLoading: true }),
    // If Image Not Loaded Use Name Instead
    textIcon = name[0] + name[1],
    redirectUrl = /https:\/\/|http:\/\//.exec(url + '') ? url : 'http://' + url,
    requestUrl = new URL(redirectUrl).hostname;

  useEffect(() => {
    // Get Favicon Url
    fetch(`http://favicongrabber.com/api/grab/${requestUrl}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.icons) {
          const iconObj =
            json.icons.find((icon) => icon.type === 'image/x-icon') ||
            json.icons.find((icon) => icon.type === 'image/png');
          // Getting Icon
          fetch(iconObj.src)
            .then((res) => res.blob())
            .then((blob) => {
              const src = URL.createObjectURL(blob);
              setIcon({ src, isLoading: false });
            })
            .catch((e) => setIcon({ src: '', isLoading: false }));
        } else setIcon({ src: '', isLoading: false });
      })
      .catch((e) => setIcon({ src: '', isLoading: false }));
  }, [requestUrl]);

  return (
    <li title={name || 'NO NAME'}>
      <span
        className={'favicon' + (icon.isLoading ? ' loading' : '')}
        style={icon.src ? { backgroundImage: `url(${icon.src})` } : {}}
      >
        {!icon.src && textIcon}
      </span>
      <a
        href={redirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="url-name"
      >
        {name || 'NO NAME'}
      </a>
      <div className="link-item__option">
        <span className="rename" title="Rename Link"></span>
        <span className="delete" title="Delete Link"></span>
      </div>
    </li>
  );
}

React.memo(LibraryItem);
