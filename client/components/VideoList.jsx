import React from 'react';
import Video from './Video.jsx';

const VideoList = (props) => (
  <div>
    {props.videos.map(video => <Video video={video} shareVideo={props.shareVideo} />)}
  </div>
)

export default VideoList;
