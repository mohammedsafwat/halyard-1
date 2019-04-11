import React from 'react';
import MapGL, { Marker, StaticMap } from 'react-map-gl';

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
      events: {}
    };
  }

  mapRef = React.createRef()

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.setViewport(width,  height);
    window.addEventListener('resize', () => this.setViewport(width, height));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.setViewport);
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
      <StaticMap
        ref={this.mapRef}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        <Marker
          latitude={this.state.viewport.latitude}
          longitude={this.state.viewport.longitude}
          offsetLeft={-12}
          offsetTop={-12}>
          <div className="marker" />
        </Marker>
      </StaticMap>
    );
  }
}

export default Map

