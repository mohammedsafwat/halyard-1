import React, { Component } from 'react'
import LocationRandomizerFilter from 'data/models/LocationRandomizerFilter'
import LocationRandomizerRemoteDataSource from 'data/datasources/remote/LocationRandomizerRemoteDataSource'
import AutocompleteRemoteDataSource from 'data/datasources/remote/AutocompleteRemoteDataSource'
import HotelsRepository from 'data/datasources/repositories/HotelsRepository'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss'

class App extends Component {
  state = {
    hotelsData: null,
    hotelsAvailabilityData: null
  }

  componentDidMount() {
    // Autocomplete Example.
    this.autocomplete('Ber')
    .then(results => console.log(results));

    // Fetch Random Location Example.
    this.fetchRandomCity()
        .then(city => { 
          // Pass in the city, the starting offset and the number of rows to fetch.
          // The result is an array of 'HotelCardData' objects.
          HotelsRepository.hotels(city, 0, 20)
            .then(result => console.log(result));
        })
        .catch(error => console.warn(error));
  }

  autocomplete = async(text) => {
    return await AutocompleteRemoteDataSource.autocomplete(text);
  }

  fetchRandomCity = async () => {
    const locationRandomizerFilter = new LocationRandomizerFilter(10);
    return await LocationRandomizerRemoteDataSource.randomLocation(locationRandomizerFilter);
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
