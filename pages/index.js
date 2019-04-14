import React, {useEffect, useState} from 'react';

import LocalContext from 'contexts/LocalContext';

import HotelsRepository from 'data/datasources/repositories/HotelsRepository'
import LocationRandomizerFilter from 'data/models/LocationRandomizerFilter'
import LocationRandomizerRemoteDataSource from 'data/datasources/remote/LocationRandomizerRemoteDataSource'

import Layout from 'components/Layout'
import Map from 'components/Map'
import CardContainer from 'components/CardContainer'

import './static/index.scss'

export default function Index() {
  const error = false;
  const [hotels, updateHotels] = useState([]);
  const [location, updateLocation] = useState({
    country: 'Brazil',
    location: {
      latitude: '-27.588205',
      longitude: '-48.5537435',
    },
    name: 'Florianópolis',
  });

  const fetchHotels = async (location) => {
    const newHotels = await HotelsRepository.hotels(location, 0, 10)
    updateHotels(newHotels)
  }

  const setLocation = async (newLocation) => {
    const city = newLocation || await LocationRandomizerRemoteDataSource.randomLocation(new LocationRandomizerFilter(50));
    updateLocation(city)
    fetchHotels(city)
    console.log(hotels)
  }

  const scrollBehavior = () => {}

  useEffect(() => {
    setLocation();
  }, [])

  return (
    <LocalContext.Provider value={{ location, setLocation, hotels, error, scrollBehavior }}>
      <Layout>
        <div className="map">
          <Map/>
        </div>
        <CardContainer />
      </Layout>
    </LocalContext.Provider>
  )
}
