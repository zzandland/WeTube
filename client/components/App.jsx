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
    const { videoToggle, mapToggle, gameToggle, toggleGoogleMap, toggleGamePlay } = this.props;
    let youtube, map, game;
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
        {youtube}
        <ChatterBox setRef={this.setRef.bind(this)} />
        {game}
        {map}
      </div>
    );
  }
}

export default App;
