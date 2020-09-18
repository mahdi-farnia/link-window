import React, { useRef } from 'react';
import '../style/recent-panel.css';
import { useSelector } from 'react-redux';
import RecentItem from './RecentItem';

export default function RecentPanel({}) {
  const recents = useSelector((store) => store.recents),
    recentPanel = useRef(null);

  return (
    <section ref={recentPanel} id="recent-panel" className="close">
      <button
        id="close-recent-panel"
        title="Close Recents"
        onClick={() => recentPanel.current.classList.toggle('close')}
      >
        <label>
          <span className="row-1"></span>
          <span className="row-2"></span>
        </label>
      </button>
      <header className="recent-panel__header">
        <h2>Recents</h2>
      </header>
      <div className="recents-wrapper">
        <ul id="recents">
          {Array.isArray(recents) ? (
            recents
              // Sort By Most Visited -> 5, 4, 3, 2, 1
              .sort((a, b) => b.visited - a.visited)
              .map((recent) => (
                <RecentItem
                  name={recent.name}
                  url={recent.url}
                  key={recent.url}
                />
              ))
          ) : (
            <span className="empty">No Recent Found!</span>
          )}
        </ul>
      </div>
    </section>
  );
}

React.memo(RecentPanel);
