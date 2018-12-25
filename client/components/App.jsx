import React, { Component } from 'react';
import io from 'socket.io-client';
import ChatterBox from '../containers/ChatterBox';
import Search from '../containers/Search';
import VideoList from './VideoList.jsx';
import GoogleMap from './GoogleMap.jsx';
import axios from 'axios';

let socket = io();

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      current: { etag:'' },
      users: [],
      videoToggle: false,
      mapToggle: false,
    };
  }

  componentDidMount() {
    this.changeUsername();
    this.getCoordinates();
    
    socket.on('change_video', (video) => {
      if (video.etag !== '') {
        this.setState({
          current: video,
        });
      }
    })

    socket.on('clients_connected', (newList) => {
      const { handleUsersChange } = this.props;
      handleUsersChange(newList);
    });
    
    socket.on('new_message', (message) => {
      console.log(message);
      const { handleMessagesChange } = this.props;
      handleMessagesChange(message);
      this.focusTextInput();
    });
  }

  changeUsername() {
    const newName = prompt("Please enter your new name", 'Anonymous');
    socket.emit('change_username', { username: newName });
  }

  focusTextInput() {
    this.textInput.focus();
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

  searchVideo(event) {
    event.preventDefault();
    const { searchQuery } = this.state;
    axios.post('/api/search', { searchQuery })
      .then((data) => {
        this.setState({ videos: data.data });
	      this.focusTextInput();
      })
  }

  sendMessage(event) {
    event.preventDefault();
    const { message, handleMessageChange } = this.props;
    socket.emit('new_message', message);
    handleMessageChange('');
    return false;
  }

  setRef(element) {
    this.textInput = element;
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
    console.log(this.state);
    const { videos, current, searchQuery, videoToggle, mapToggle, messages, message, users } = this.state;
    let videoList, mainVideo, youtube, map;
    if (videoToggle) {
      if (!videos.length) {
        videoList = <div>Search a video!</div>;
      } else {
        videoList = (
          <div>
            <VideoList videos={videos} shareVideo={this.shareVideo.bind(this)} />
          </div>
        );
      }
      youtube = (
        <div>
          <Search searchVideo={() => { this.searchVideo() }} />
          {videoList}
          {mainVideo}
        </div>
      );
    }
    if (mapToggle) {
      map = (
        <div>
          <GoogleMap users={users} />
          <button onClick={this.toggleGoogleMap.bind(this)}>Close</button>
        </div>
      );
    } else {
      map = <button onClick={this.toggleGoogleMap.bind(this)}>Where is everyone?</button>
    }
    return (
      <div>
        {youtube}
        <ChatterBox 
          current={current} 
          users={users}
          changeUsername={this.changeUsername.bind(this)}
          sendMessage={this.sendMessage.bind(this)}
          setRef={this.setRef.bind(this)}
          toggleGoogleMap={this.toggleGoogleMap.bind(this)}
          toggleYoutube={this.toggleYoutube.bind(this)}
        />
        {map}
      </div>
    );
  }
}

export default App;
