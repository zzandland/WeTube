import React, { Component } from 'react';
import ChatterBox from '../containers/ChatterBox';
import Search from '../containers/Search';
import VideoList from '../containers/VideoList';
import GoogleMap from '../containers/GoogleMap';
import Game from '../containers/Game';
import axios from 'axios';

class App extends Component { 
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initUsername();
    this.initCoordinates();
  }

  focusTextInput() {
    this.textInput.focus();
  }

  handleSendGameResponse(bool) {
    const { self, sendGameResponse, receivedData } = this.props;
    const data = {
      response: bool,
      sender: self.userId,
      recipient: receivedData.challenger, 
      game: receivedData.game,
    }; 
    sendGameResponse(data); }

  initUsername() {
    const { changeUsername } = this.props;
    const randomNum = Math.floor(Math.random * 1000);
    changeUsername(`Anonymous`);
  }

  initCoordinates() {
    const { getCoordinates } = this.props;
    const success = (pos) => {
      const crd = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      getCoordinates(crd);
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

  setRef(element) {
    this.textInput = element;
  }

  render() {
    const { users, videoToggle, mapToggle, gameToggle, toggleGoogleMap, toggleGamePlay, hasReceived, receivedData } = this.props;
    let youtube, map, game, notification;
    if (hasReceived) {
      const challengerIndex = users.map(user => user.userId).indexOf(receivedData.challenger);
      const challengerName = users[challengerIndex].name;
      notification = (
        <div>
          <p>{challengerName} wants to play {receivedData.game} together!</p>
          <button onClick={() => { this.handleSendGameResponse(true) }}>Accept</button>
          <button onClick={() => { this.handleSendGameResponse(false) }}>Reject</button>
        </div>
      );
    }
    if (videoToggle) {
      youtube = (
        <div>
          <Search />
          <VideoList />
        </div>
      );
    }
    if (gameToggle) {
      game = (
        <div>
          <Game />
          <button onClick={() => { toggleGamePlay() }}>Hide</button>
        </div>
      );
    } else {
      game = <button onClick={() => { toggleGamePlay() }}>Play Game!</button>
    }
    if (mapToggle) {
      map = (
        <div>
          <GoogleMap />
          <button onClick={() => { toggleGoogleMap() }}>Close</button>
        </div>
      );
    } else {
      map = <button onClick={() => { toggleGoogleMap() }}>Where is everyone?</button>
    }
    return (
      <div>
        {notification}
        {youtube}
        <ChatterBox setRef={this.setRef.bind(this)} />
        {game}
        {map}
      </div>
    );
  }
}

export default App;
