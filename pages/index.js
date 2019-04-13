import React from 'react';

import HotelsRepository from 'data/datasources/repositories/HotelsRepository'
import LocationRandomizerFilter from 'data/models/LocationRandomizerFilter'
import LocationRandomizerRemoteDataSource from 'data/datasources/remote/LocationRandomizerRemoteDataSource'
import AutocompleteRemoteDataSource from 'data/datasources/remote/AutocompleteRemoteDataSource'

import Layout from 'components/Layout'
import Map from 'components/Map'
import CardContainer from 'components/CardContainer'
import './static/index.scss'

const cards = [
  {
    hotelId: 0,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 1,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 2,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 0,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 1,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 2,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 0,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 1,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 2,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 0,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 1,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 2,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 0,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 1,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 2,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 0,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 1,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
  {
    hotelId: 2,
    image: 'https://via.placeholder.com/300',
    score: 3,
    price: 3,
    hotelUrl: '',
    imageAlt: ''
  },
]

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      geo: { latitude: -27.588205, longitude: -48.5537435 },
      error: false,
      city: null,
      hotels: null
    };
  }

  async componentDidMount() {
    const city = await this.fetchRandomCity();
    await this.fetchHotels(city, 0, 10);
  }

  autocomplete = async(text) => {
    return await AutocompleteRemoteDataSource.autocomplete(text);
  }

  fetchRandomCity = async () => {
    const locationRandomizerFilter = new LocationRandomizerFilter(50);
    return await LocationRandomizerRemoteDataSource.randomLocation(locationRandomizerFilter);
  }

  fetchHotels = async (city, offset, rows) => {
    const hotels = await HotelsRepository.hotels(city, offset, rows);
    if (this.state.hotels) {
      const allHotels = this.state.hotels.concat(hotels)
      this.setState({city, hotels: allHotels});
    } else {
      this.setState({city, hotels});
    }
  }

  fetchMoreHotels = async () => {
    return await this.fetchHotels(this.state.city, this.state.hotels.length, 10);
  }
  
  render() {
    const { geo: { latitude, longitude }, error, cityName, hotels } = this.state;
    if (hotels) {
      return (
        <Layout cityName={cityName}>
          <div className="map">
            <Map latitude={latitude} longitude={longitude} />
          </div>
          <CardContainer cards={hotels} fetchMoreHotels={this.fetchMoreHotels} hasError={error} />
        </Layout>
      ); 
    }
    return <h4>Loading...</h4>
  }
}

export default Index
