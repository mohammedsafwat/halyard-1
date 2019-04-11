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
      cityName: 'Florianópolis'
    };
  }

  async componentDidMount() {
    // this.autocomplete('Ber')
    // .then(results => console.log(results));

    const city = await this.fetchRandomCity

    this.fetchRandomCity()
        .then(city => { 
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
    const { geo: { latitude, longitude }, error, cityName } = this.state;
    return (
      <Layout cityName={cityName}>
        <div className="map">
          <Map latitude={latitude} longitude={longitude} />
        </div>
        <CardContainer cards={cards} hasError={error} />
    </Layout>
    );
  }
}

export default Index
