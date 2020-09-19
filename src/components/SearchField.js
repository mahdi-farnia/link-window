import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../style/search-field.css';

// Suggest
const searchType = (input, suggestion, setComplete) => {
  const { value } = input,
    url = value.trim(),
    suggest = url.length !== 0 && url !== '.' && 'http'.includes(value);
  suggestion.textContent = suggest
    ? (() => {
        setComplete(true);
        return 'http';
      })()
    : (() => {
        setComplete(false);
        return '';
      })();
};

// Prevent "Tab", ...
const inputSetting = (e, complete, setComplete) => {
  if (e.key === 'Tab' || e.which === 9) e.preventDefault();

  if (complete) {
    if (
      e.key === 'Enter' ||
      e.which === 13 ||
      e.key === 'ArrowRight' ||
      e.which === 39
    ) {
      e.target.value = 'http';
      setComplete(false);
    }
  }
};

export default function SearchField() {
  const input = useRef(null),
    suggestion = useRef(null),
    [autoComplete, setAutoComplete] = useState(false);

  return (
    <section id='search-field'>
      <div className='input-wrapper'>
        <button
          className='icon'
          title='Clear Field'
          onClick={() => {
            input.current.focus();
            input.current.value = '';
          }}
        ></button>
        <span className='suggest' ref={suggestion}></span>
        <input
          type='text'
          id='url-field'
          placeholder='Add Url'
          ref={input}
          onKeyDown={(e) => inputSetting(e, autoComplete, setAutoComplete)}
          onKeyUp={() =>
            searchType(input.current, suggestion.current, setAutoComplete)
          }
        />
      </div>
    </section>
  );
}

React.memo(SearchField);
