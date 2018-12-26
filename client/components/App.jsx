import React, { Component } from 'react';
import ChatterBox from '../containers/ChatterBox';
import Search from '../containers/Search';
import VideoList from '../containers/VideoList';
import GoogleMap from '../containers/GoogleMap';
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
    changeUsername('Anonymous');
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
    const { videoToggle, mapToggle, toggleGoogleMap } = this.props;
    let youtube, map;
    if (videoToggle) {
      youtube = (
        <div>
          <Search />
          <VideoList />
        </div>
      );
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
        <ChatterBox 
          setRef={this.setRef.bind(this)}
        />
        {map}
      </div>
    );
  }
}

export default App;
