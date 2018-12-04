import React from 'react';

const Search = (props) => (
  <div>
    <input type="text" id="search"></input>
    <button type="submit" onClick={props.searchVideo}>Search</button>
  </div>
)

export default Search;
