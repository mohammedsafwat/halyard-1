import React from 'react';

import Layout from 'components/Layout'
import Map from 'components/Map'
import CardContainer from 'components/CardContainer'
import './scss/index.scss'

class Index extends React.Component {

  constructor() {
    super()
    this.state = {
      geo: { latitude: -27.588205, longitude: -48.5537435 }
    };
  }

  render() {
    const { latitude, longitude } = this.state.geo;
    return (
      <Layout>
        <div className="map">
          <Map latitude={latitude} longitude={longitude} />
        </div>
        <CardContainer />
    </Layout>
    );
  }
}

export default Index
