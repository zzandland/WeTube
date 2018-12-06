import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker.jsx';
import APIkey from '../../youtubeAPI.js';

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    center: {
      lat: 37.78,
      lng: -122.40
    },
    zoom: 11
  };

  render() {
    const { users } = this.props;
    return (
      <div style={{ height: '400px', width: '400px' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIkey.map }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {users.map(user => {
            if (user.coords) {
              return (
                <Marker
                  lat={user.coords.lat}
                  lng={user.coords.lng}
                  name={user.name}
                />
              );
            }
          })}
        </GoogleMapReact>
      </div>
    )
  }
} 

export default GoogleMap;
