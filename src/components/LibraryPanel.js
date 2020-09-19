import React, { useRef } from 'react';
import '../style/library-panel.css';
import { useSelector } from 'react-redux';
import LibraryItem from './LibraryItem';

export default function LibraryPanel() {
  // @ts-ignore
  const links = useSelector((store) => store.links),
    LibraryPanel = useRef(null);

  return (
    <section ref={LibraryPanel} id="library-panel" className="close">
      <button
        id="close-library-panel"
        title="Close Library Panel"
        onClick={() => LibraryPanel.current.classList.toggle('close')}
      >
        <label>
          <span className="row-1"></span>
          <span className="row-2"></span>
        </label>
      </button>
      <header className="library-panel__header">
        <h2>Library</h2>
      </header>
      <div className="links-wrapper">
        <ul id="links">
          {Array.isArray(links) && links.length > 0 ? (
            links
              // Sort By Most Visited -> 5, 4, 3, 2, 1
              .sort((a, b) => b.visited - a.visited)
              .map((link) => (
                <LibraryItem name={link.name} url={link.url} key={link.url} />
              ))
          ) : (
            <span className="empty">No Links Found!</span>
          )}
        </ul>
      </div>
    </section>
  );
}

React.memo(LibraryPanel);
