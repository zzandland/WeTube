import React, { Component } from 'react';
import ChatterBox from '../containers/ChatterBox';
import Search from '../containers/Search';
import VideoList from '../containers/VideoList';
import GoogleMap from '../containers/GoogleMap';
import axios from 'axios';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      mapToggle: false,
    };
  }

  componentDidMount() {
    const { changeUsername } = this.props;
    changeUsername('Anonymous');
    this.getCoordinates();
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
      //socket.emit('send_coords', crd);
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

  toggleGoogleMap() {
    const { mapToggle } = this.state;
    this.setState({
      mapToggle: !mapToggle
    });
  }

  render() {
    const { videoToggle } = this.props;
    const { mapToggle } = this.state;
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
          setRef={this.setRef.bind(this)}
          toggleGoogleMap={this.toggleGoogleMap.bind(this)}
        />
        {map}
      </div>
    );
  }
}

export default App;
