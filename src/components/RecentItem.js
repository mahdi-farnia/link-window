import React, { useEffect, useState } from 'react';
import defaultFavicon from '../assets/internet.svg';

export default function RecentItem({ name, url }) {
  // Default icon is internet svg
  const [iconUrl, setIconUrl] = useState(''),
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
          setIconUrl(iconObj.src || defaultFavicon);
        }
      })
      .catch((e) => setIconUrl(defaultFavicon));
  }, []);

  return (
    <li title={name || 'NO NAME'}>
      <span
        className='favicon'
        style={{ backgroundImage: `url(${iconUrl})` }}
      ></span>
      <a
        href={redirectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='url-name'
      >
        {name || 'NO NAME'}
      </a>
      <div className='recent-item__option'>
        <span className='rename'></span>
        <span className='delete'></span>
      </div>
    </li>
  );
}

React.memo(RecentItem);
