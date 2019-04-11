import React, { Component } from 'react'
import HotelsRemoteDataSource from './data/datasources/remote/HotelsRemoteDataSource'
import UserLocationRemoteDataSource from './data/datasources/remote/UserLocationRemoteDataSource'
import HotelsAvailabilityRemoteDataSource from './data/datasources/remote/HotelsAvailabilityRemoteDataSource'
import HotelsFilter from './data/models/static_data/HotelsFilter'
import HotelsAvailabilityFilter from './data/models/dynamic_data/HotelsAvailabilityFilter'
import DateUtils from './data/utils/DateUtils'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss'

class App extends Component {
  state = {
    hotelsData: null,
    hotelsAvailabilityData: null
  }

  componentDidMount() {
    this.fetchUserLocation()
      .then(userLocation => {
        this.fetchHotelsData(userLocation)
        console.log(userLocation)
      }).catch(error => {
        console.warn(error);
      });
  }

  fetchHotelsData = async (userLocation) => {
    const hotelsAvailabilityFilter = new HotelsAvailabilityFilter(DateUtils.nowDate(), DateUtils.nextMonthsDate(1), userLocation.latitude, userLocation.longitude, 'A,A', 0, 20);
    this.fetchHotelsAvailability(hotelsAvailabilityFilter)
      .then(hotelsAvailabilityData => {
        this.setState(() => ({
          hotelsAvailabilityData
        }));
        const hotelIds = hotelsAvailabilityData.map(hotelAvailability => {
          return hotelAvailability.hotelId;
        }).join(',');
        const hotelsFilter = new HotelsFilter(hotelIds, 0, 20);
        this.fetchHotels(hotelsFilter).then(hotelsData => this.setState(() => ({
          hotelsData
        })));
      });
  };

  fetchUserLocation = async () => {
    return await UserLocationRemoteDataSource.userLocation();
  }

  fetchHotels = async (hotelsFilter) => {
    return await HotelsRemoteDataSource.hotels(hotelsFilter);
  }

  fetchHotelsAvailability = async (hotelsAvailabilityFilter) => {
    return await HotelsAvailabilityRemoteDataSource.hotelsAvailability(hotelsAvailabilityFilter);
  }
  
  render() {
    const { hotelsAvailabilityData, hotelsData } = this.state;

    return (
      <div className="App">
        {!hotelsAvailabilityData || !hotelsData ? <p>Loading..</p> : <p>Data available</p>}
      </div>
    );
  }
}

export default App;
