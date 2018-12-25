import React from 'react';

const Search = ({ searchQuery, searchVideo, handleSearchChange }) => (
  <form onSubmit={searchVideo}>
    <input 
      type="text" 
      value={searchQuery}
      onChange={(event) => { handleSearchChange(event.target.value) }}
    ></input>
    <input type="submit" value="Search" />
  </form>
)

export default Search;
