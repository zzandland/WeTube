import React, { Component } from 'react';
import axios from 'axios';
import Chat from './Chat.jsx';

const ChatterBox = (props) => {
  const { users, changeUsername, sendMessage, setRef, handleMessageChange, toggleYoutube, messages, message, current } = props;
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
        <form onSubmit={sendMessage}>
          <input 
            type="text" 
            tabIndex="-1"
            ref={setRef}
            value={message} 
            onChange={handleMessageChange}
          ></input>
          <input type="submit" value="Send" />
          <button onClick={toggleYoutube}><i class="fab fa-youtube"></i></button>
        </form>
        <button onClick={changeUsername}>Change username</button>
      </div>
    </div>
  );
}

export default ChatterBox;
