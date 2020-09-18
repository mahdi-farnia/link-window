import React from 'react';
import '../style/recent-panel.css';
import { useSelector } from 'react-redux';
import RecentItem from './RecentItem';

export default function RecentPanel({}) {
  const recents = useSelector((store) => store.recents);

  return (
    <section id='recent-panel'>
      <button id='close-recent-panel'>
        <label>
          <span></span>
          <span></span>
        </label>
        <span>close</span>
      </button>
      <header className='recent-panel__header'>
        <h2>Recents</h2>
      </header>
      <div className='recents-wrapper'>
        <ul id='recents'>
          {recents ? (
            recents.map((recent) => (
              <RecentItem
                name={recent.name}
                url={recent.url}
                key={recent.url}
              />
            ))
          ) : (
            <span className='empty'>No Recent Found!</span>
          )}
        </ul>
      </div>
    </section>
  );
}

React.memo(RecentPanel);
