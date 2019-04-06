import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HotelsRemoteDataSource from './data/datasources/remote/HotelsRemoteDataSource';
import CitiesRemoteDataSource from './data/datasources/remote/CitiesRemoteDataSource';
import HotelsFilter from './data/models/HotelsFilter'
import CitiesFilter from './data/models/CitiesFilter';

class App extends Component {
  componentDidMount() {
    this.fetchHotels();
  }
  
  fetchHotels = async () => {
    const hotels = await HotelsRemoteDataSource.hotels(new HotelsFilter(-3875419, 0, 20));
    console.log(hotels);

    const cities = await CitiesRemoteDataSource.cities(new CitiesFilter(0, 20));
    console.log(cities);
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
