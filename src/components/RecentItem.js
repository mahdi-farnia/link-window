import React, { useEffect, useState } from 'react';
import loadingFavicon from '../assets/loading.svg';

export default function RecentItem({ name, url }) {
  // Use Loading Favicon First
  const [icon, setIcon] = useState({ src: loadingFavicon, isLoading: true }),
    // If Image Not Loaded Use Name Instead
    [textIcon, setTextIcon] = useState(name[0] + name[1]),
    redirectUrl = /https:\/\/|http:\/\//.exec(url + '') ? url : 'http://' + url,
    requestUrl = (url + '').replace(/https:\/\/|http:\/\//, '');

  useEffect(() => {
    // Get Favicon
    fetch(`http://favicongrabber.com/api/grab/${requestUrl}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.icons) {
          const iconObj = json.icons.find(
            (icon) => icon.type === 'image/x-icon'
          );
          setIcon({ src: iconObj.src, isLoading: false });
        } else setIcon({ src: '', isLoading: false });
      })
      .catch((e) => setIcon({ src: '', isLoading: false }));
  }, []);

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
      <div className="recent-item__option">
        <span className="rename"></span>
        <span className="delete"></span>
      </div>
    </li>
  );
}

React.memo(RecentItem);
