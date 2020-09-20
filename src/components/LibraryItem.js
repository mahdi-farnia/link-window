import React, { useEffect, useState } from 'react';
import Favicon from './LibraryItemFavicon';

export default function LibraryItem({ name, url }) {
  // Use Loading Favicon First
  const [icon, setIcon] = useState({ src: '', isLoading: true }),
    // If Image Not Loaded Use Name Instead
    textIcon = name[0] + name[1],
    redirectUrl = /https:\/\/|http:\/\//.exec(url + '') ? url : 'http://' + url,
    requestUrl = new URL(redirectUrl).hostname;

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
    <li title={name || 'NO NAME'}>
      <Favicon icon={icon} textIcon={textIcon} />
      <a
        href={redirectUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='url-name'
      >
        {name || 'NO NAME'}
      </a>
      <div className='link-item__option'>
        <span className='rename' title='Rename Link'></span>
        <span className='delete' title='Delete Link'></span>
      </div>
    </li>
  );
}

React.memo(LibraryItem);
