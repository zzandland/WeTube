import React from 'react';
import Video from '../containers/Video';

export default ({ videos, isLoading, hasErrored }) => {
  if (isLoading) {
    return <div>is loading...</div>;
  } else if (hasErrored) {
    return <div>Errored occurred</div>;
  } else {
     if (videos.length === 0) {
      return <div>Search a video!</div>;
    } else {
      return (
        <div>
          {videos.map(video => <Video video={video} />)}
        </div>
      );
    } 
  }
};

