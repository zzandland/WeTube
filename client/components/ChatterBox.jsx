import React, { Component } from 'react';
import axios from 'axios';
import Chat from './Chat.jsx';

export default ({ message, messages, name, users, current, changeUsername, handleNameChange, handleMessageChange, sendMessage, toggleYoutube, setRef }) => {
  let currentVideo;
  if (current.etag !== '') {
    const src = `https://www.youtube.com/embed/${current.id.videoId}?autoplay=1`;
    currentVideo = <iframe width="420" height="315" src={src} frameborder="0" allowfullscreen></iframe>
  }
  return (
    <div>
      <div>
        <ul>users in the room: {users.map(user => <li>{user.name}</li>)}</ul>
        {currentVideo}
        <ul>
          {messages.map(message => (
            <Chat message={message} />
          ))}
        </ul>
        <form 
          onSubmit={event => {
            event.preventDefault();
            sendMessage(message);
            handleMessageChange('');
          }
        }>
          <input 
            type="text" 
            ref={setRef}
            value={message} 
            onChange={event => { handleMessageChange(event.target.value) }}
          ></input>
          <input type="submit" value="Send" />
        </form>
        <button onClick={() => { toggleYoutube() }}><i class="fab fa-youtube"></i></button>
        <form
          onSubmit={event => {
            event.preventDefault();
            changeUsername(name);           
            handleNameChange('');
          }}
        >
          <input
            type="text"
            value={name}
            onChange={event => { handleNameChange(event.target.value) }}
          ></input>
          <button>Change username</button>
        </form>
      </div>
    </div>
  );
};
