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
      searchQuery: '',
      message: '',
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
      this.setState({
        users: newList
      });
    });
    
    socket.on('new_message', (message) => {
      const newMessages = this.state.messages.slice();
      newMessages.push(message);
      this.setState({
        messages: newMessages,
      })
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

  handleMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSearchChange(event) {
    this.setState({ searchQuery: event.target.value });
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
    const { message } = this.state;
    event.preventDefault();
    socket.emit('new_message', message);
    this.setState({ message: '' });
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
          <Search 
            handleSearchChange={this.handleSearchChange.bind(this)} 
            searchVideo={this.searchVideo.bind(this)} 
          />
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
          messages={messages} 
          message={message}
          current={current} 
          users={users}
          changeUsername={this.changeUsername.bind(this)}
          handleMessageChange={this.handleMessageChange.bind(this)}
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
