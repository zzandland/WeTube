import React, { Component } from 'react';
import io from 'socket.io-client';
import ChatterBox from './ChatterBox.jsx';
import Search from './Search.jsx';
import VideoList from './VideoList.jsx';
import GoogleMap from './GoogleMap.jsx';
import axios from 'axios';

let socket = io();

class App extends Component { 
  constructor() {
    super();
    this.state = {
      videos: [],
      messages: [],
      current: { etag:'' },
      users: [],
      videoToggle: false,
      mapToggle: false,
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.searchVideo = this.searchVideo.bind(this);
    this.shareVideo = this.shareVideo.bind(this);
    this.toggleYoutube = this.toggleYoutube.bind(this);
  }

  componentDidMount() {
    this.changeUsername();
    this.getCoordinates();
    
    socket.on('new_message', (message) => {
      const newMessages = this.state.messages.slice();
      newMessages.push(message);
      this.setState({
        messages: newMessages,
      })
    });
    
    socket.on('change_video', (video) => {
      if (video.etag !== '') {
        this.setState({
          current: video,
        });
      }
    })

    socket.on('clients_connected', (newList) => {
      this.setState({
        users: newList
      });
    });
  }

  changeUsername() {
    const newName = prompt("Please enter your new name", 'Anonymous');
    socket.emit('change_username', { username: newName });
  }

  getCoordinates() {
    const success = (pos) => {
      const crd = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      socket.emit('send_coords', crd);
    }

    const error = (err) => {
      console.log(err);
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  sendMessage() {
    if (event.type === 'click' || event.key === 'Enter') {
      let messageInput = document.querySelector('#chat');
      socket.emit('new_message', messageInput.value);
      messageInput.value = '';
      return false;
    }
  }

  searchVideo() {
    if (event.type === 'click' || event.key === 'Enter') {
      const query = document.querySelector('#search').value;
      axios.post('/api/search', { query })
        .then((data) => {
          this.setState({
            videos: data.data,
          })
        })
    }
  }

  shareVideo(video) {
    this.setState({
      current: video,
      videos: [],
      videoToggle: false,
    });
    socket.emit('change_video', video);
    document.querySelector('#search').value = '';
  }

  toggleGoogleMap() {
    const { mapToggle } = this.state;
    this.setState({
      mapToggle: !mapToggle
    });
  }

  toggleYoutube() {
    const { videoToggle } = this.state;
    this.setState({
      videoToggle: !videoToggle
    })
  }

  render() {
    const { videos, current, videoToggle, mapToggle, messages, users } = this.state;
    let videoList, mainVideo, youtube, map;
    if (videoToggle) {
      if (!videos.length) {
        videoList = <div>Search a video!</div>;
      } else {
        videoList = (
          <div>
            <VideoList videos={videos} shareVideo={this.shareVideo} />
          </div>
        );
      }
      youtube = (
        <div>
          <Search searchVideo={this.searchVideo} />
          {videoList}
          {mainVideo}
        </div>
      );
    }
    if (mapToggle) {
      map = (
        <div>
          <GoogleMap users={users} />
          <button onClick={() => { this.toggleGoogleMap() }}>Close</button>
        </div>
      );
    } else {
      map = <button onClick={() => { this.toggleGoogleMap() }}>Where is everyone?</button>
    }
    return (
      <div>
        {youtube}
        <ChatterBox 
          messages={messages} 
          current={current} 
          users={users}
          changeUsername={this.changeUsername}
          sendMessage={this.sendMessage}
          toggleGoogleMap={this.toggleGoogleMap}
          toggleYoutube={this.toggleYoutube}
        />
        {map}
      </div>
    );
  }
}

export default App;
