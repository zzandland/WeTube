import React from 'react';

export default ({ video, shareVideo }) => (
  <span 
    onClick={() => { shareVideo(video) }}>
    <h3>{video.snippet.title}</h3>
    <img src={video.snippet.thumbnails.default.url} />
  </span>
);
