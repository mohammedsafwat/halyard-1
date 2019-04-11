import React from 'react';
import ReactMapGL from 'react-map-gl';

class Map extends React.Component {
  constructor(props) {
    super(props);
    const {latitude, longitude } = this.props
    this.state = {
      viewport: {
        latitude: latitude,
        longitude: longitude,
        zoom: 5,
        bearing: 0,
        pitch: 0
      },
      marker: {
        latitude: latitude,
        longitude: longitude
      },
      events: {}
    };
  }

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.setViewport(width,  height);
    window.addEventListener('resize', () => this.setViewport(width, height));
  }

  setViewport = (width, height) => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: width <= 800 ? width : width/2,  
        height: height - 60,
      }
    })
  }

  render() {
    return (
      <ReactMapGL
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map

