import React from 'react';

const Search = ({ searchVideo, handleSearchChange }) => (
  <form onSubmit={searchVideo}>
    <input type="text" onChange={handleSearchChange}></input>
    <input type="submit" value="Search" />
  </form>
)

export default Search;
