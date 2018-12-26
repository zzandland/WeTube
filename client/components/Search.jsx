import React, { Component } from 'react';

export default ({ searchQuery, searchVideo, handleSearchChange }) => (
  <form 
    onSubmit={event => { 
      event.preventDefault();
      searchVideo(searchQuery);
      handleSearchChange('');
    }
  }>
    <input 
      type="text" 
      value={searchQuery}
      onChange={event => { handleSearchChange(event.target.value) }}
    ></input>
    <input type="submit" value="Search" />
  </form>
);
