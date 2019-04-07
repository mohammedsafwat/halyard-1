import React from 'react';
import Layout from '../components/Layout'
import ReactMapGL from 'react-map-gl';

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      marker: {
        latitude: 37.785164,
        longitude: -100,
      },
      events: {}
    };
  }

  render() {
    const {viewport} = this.state;

    return (
      <Layout>
        {/* <ReactMapGL
          {...viewport}
          width={400}
          height={400}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxApiAccessToken="pk.eyJ1IjoidGFsaWVzY2hlciIsImEiOiJjam9pYWg0bGIwMHpyM3dwYW1sZ211Z2ZvIn0.f9u_i3_uGnJQ9UKD5cGzFg"
          onViewportChange={(viewport) => this.setState({viewport})}
        /> */}
      </Layout>
    );
  }
}

export default Index

