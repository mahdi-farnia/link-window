import React, { useState } from 'react';

export default function LibraryItemFavicon({ icon, textIcon }) {
  const [fullyLoaded, setFullyLoaded] = useState(false),
    [hasError, setHasError] = useState(false);

  return (
    <>
      {!hasError && !icon.isLoading && (
        <img
          src={icon.src}
          alt='Favicon'
          className='img-favicon'
          onLoad={() => setFullyLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {!fullyLoaded && (
        <span className={'favicon' + (!hasError ? ' loading' : '')}>
          {hasError && textIcon}
        </span>
      )}
    </>
  );
}
