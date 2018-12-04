import React from 'react';

const Chat = (props) => (
  <li>
    <h5>{props.message.username}</h5>
    <p>{props.message.message}</p>
  </li>
);

export default Chat;
