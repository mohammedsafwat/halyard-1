import implement from 'implement-js'
import LocationRandomizerDataSource from '../../protocols/LocationRandomizerDataSource';
import CitiesRemoteDataSource from '../../datasources/remote/CitiesRemoteDataSource';
import CitiesFilter from '../../models/CitiesFilter'

const LocationRandomizerRemoteDataSource = implement(LocationRandomizerDataSource)({
    async randomLocation(locationRandomizerFilter) {
        const citiesFilter = new CitiesFilter(0, 1000);
        const cities = await CitiesRemoteDataSource.cities(citiesFilter);
        const filteredCities = cities.filter(city => city.numberOfHotels >= locationRandomizerFilter.minNumberOfHotels);
        const randomCityIndex = Math.floor((Math.random() * filteredCities.length) + 1);
        return filteredCities[randomCityIndex];
    }
});

export default LocationRandomizerRemoteDataSource;