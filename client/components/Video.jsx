import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    }
    this.toggleHovered = this.toggleHovered.bind(this);
  }

  toggleHovered() {
    const { clicked } = this.state;
    this.setState({
      clicked: !clicked,
    });
  }
  
  render() {
    const { clicked } = this.state;
    const { shareVideo } = this.props;
    let shareBtn;
    if (clicked) {
      shareBtn = <button type="submit">Share</button>
    }
    return (
      <span onClick={() => {this.props.shareVideo(this.props.video)}} onMouseOver={this.toggleHovered} onMouseLeave={this.toggleHovered}>
        <h3>{this.props.video.snippet.title}</h3>
        <img src={this.props.video.snippet.thumbnails.default.url} />
        {shareBtn}
      </span>
    );
  }
}

export default Video;
