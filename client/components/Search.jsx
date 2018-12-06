import React from 'react';

const Search = ({ searchVideo }) => (
  <div>
    <input type="text" onKeyPress={searchVideo}id="search"></input>
    <button type="submit" onClick={searchVideo}>Search</button>
  </div>
)

export default Search;
