import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../style/search-field.css';
import { addUrl } from '../actions';

// const APIKEY = 'AIzaSyAA0muLeuu726-eSkL7gwXeq-fJJ-AGa5o';

const urlRegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;

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

// Prevent "Tab",..., Submit,...
const inputSetting = (e, complete, setComplete, submitDispatch) => {
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
  // Submit
  else if (e.key === 'Enter' || e.which === 13) {
    const { value } = e.target;

    if (!value.match(urlRegExp)) alert('Url is not valid');
    else {
      submitDispatch(
        addUrl({
          url: value,
          name: value,
          visited: 0,
          dateCreated: Date.now()
        })
      );
      e.target.value = '';
    }
  }
};

export default function SearchField() {
  const input = useRef(null),
    suggestion = useRef(null),
    [autoComplete, setAutoComplete] = useState(false),
    dispatch = useDispatch();

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
          onKeyDown={(e) =>
            inputSetting(e, autoComplete, setAutoComplete, dispatch)
          }
          onKeyUp={() =>
            searchType(input.current, suggestion.current, setAutoComplete)
          }
        />
      </div>
    </section>
  );
}

React.memo(SearchField);
