import React from 'react';

// import UserLocationRemoteDataSource from 'data/datasources/remote/UserLocationRemoteDataSource'

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


  // async componentDidMount() {
  //   try {
  //     const location = await UserLocationRemoteDataSource.userLocation()
  //     this.setState({ geo: location })
  //   } catch(err) {
  //     console.warn(err);
  //   }
  // }

  // fetchHotelsData = async (userLocation) => {
  //   const hotelsAvailabilityFilter = new HotelsAvailabilityFilter(DateUtils.nowDate(), DateUtils.nextMonthsDate(1), userLocation.latitude, userLocation.longitude, 'A,A', 0, 20);
  //   this.fetchHotelsAvailability(hotelsAvailabilityFilter)
  //     .then(hotelsAvailabilityData => {
  //       this.setState(() => ({
  //         hotelsAvailabilityData
  //       }));
  //       const hotelIds = hotelsAvailabilityData.map(hotelAvailability => {
  //         return hotelAvailability.hotelId;
  //       }).join(',');
  //       const hotelsFilter = new HotelsFilter(hotelIds, 0, 20);
  //       this.fetchHotels(hotelsFilter).then(hotelsData => this.setState(() => ({
  //         hotelsData
  //       })));
  //     });
  // };

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
