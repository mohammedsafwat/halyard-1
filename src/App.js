import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import HotelsRemoteDataSource from './data/datasources/remote/HotelsRemoteDataSource'
import CitiesRemoteDataSource from './data/datasources/remote/CitiesRemoteDataSource'
import UserLocationRemoteDataSource from './data/datasources/remote/UserLocationRemoteDataSource'
import HotelsAvailabilityRemoteDataSource from './data/datasources/remote/HotelsAvailabilityRemoteDataSource'
import HotelsFilter from './data/models/static_data/HotelsFilter'
import CitiesFilter from './data/models/CitiesFilter'
import HotelsAvailabilityFilter from './data/models/dynamic_data/HotelsAvailabilityFilter'

class App extends Component {
  componentDidMount() {
    this.fetchHotels();
    this.fetchCities();
    this.fetchUserLocation();
    this.fetchHotelsAvailability();
  }
  
  fetchHotels = async () => {
    const hotels = await HotelsRemoteDataSource.hotels(new HotelsFilter(-3875419, 0, 20));
    console.log(hotels);
  }

  fetchCities = async () => {
    const cities = await CitiesRemoteDataSource.cities(new CitiesFilter(0, 20));
    console.log(cities);
  }

  fetchUserLocation = async () => {
    const userLocation = await UserLocationRemoteDataSource.userLocation();
    console.log(userLocation);
  }

  fetchHotelsAvailability = async () => {
    const hotelsAvailabilityFilter = new HotelsAvailabilityFilter('2019-07-06', '2019-07-07', -1565670, 'A,A');
    const hotelsAvailability = await HotelsAvailabilityRemoteDataSource.hotelsAvailability(hotelsAvailabilityFilter);
    console.log(hotelsAvailability);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
