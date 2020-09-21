import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/search-field.css';
import { addToLibrary } from '../actions';

const urlRegExp = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

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
const inputSetting = (e, complete, setComplete, submitDispatch, links = []) => {
  if (e.key === 'Tab' || e.which === 9) e.preventDefault();

  if (complete) {
    if (
      e.key === 'Enter' ||
      e.which === 13 ||
      e.key === 'ArrowRight' ||
      e.which === 39 ||
      e.key === 'Tab' ||
      e.which === 9
    ) {
      e.target.value = 'http';
      setComplete(false);
    }
  }
  // Submit
  else if (e.key === 'Enter' || e.which === 13) {
    const { value } = e.target,
      // Parse URL
      Url = new URL(
        /https:\/\/|http:\/\//.exec(value + '') ? value : 'http://' + value
      ),
      url = Url.href,
      // Prevent Write HTTP/HTTPS
      name = (Url.host + Url.pathname + Url.search).replace(/\/$/, '');

    if (!value.match(urlRegExp)) alert('Url is not valid');
    else if (links.find((link) => link.url === url)) alert('Url already exist');
    else {
      submitDispatch(
        addToLibrary({
          url,
          name,
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
    // @ts-ignore
    links = useSelector((store) => store.links),
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
            inputSetting(e, autoComplete, setAutoComplete, dispatch, links)
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
