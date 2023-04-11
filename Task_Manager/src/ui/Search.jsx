import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilterWord } from '../features/filter/filterSlice';

function Search() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
    dispatch(setFilterWord(e.target.value));
  };

  return (
    <div className="flex-1 max-w-xs search-field group">
      <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
      <input
        type="text"
        placeholder="Search Task"
        className="search-input"
        id="lws-searchTask"
        value={input}
        onChange={handleChange}
      />
    </div>
  );
}

export default Search;
