import implement from 'implement-js'
import UserLocationDataSource from 'data/protocols/UserLocationDataSource'
import geolocator from 'geolocator'
import ApiConstants from 'data/constants/ApiConstants'
import LocationResponseParameters from 'data/helpers/LocationResponseParameters'
import Location from 'data/models/Location'

const UserLocationRemoteDataSource = implement(UserLocationDataSource)({
    async userLocation() {
        geolocator.config({
            language: "en",
            google: {
                version: "3",
                key: ApiConstants.googleApiKey
            }
        });
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumWait: 10000,     // max wait time for desired accuracy
            maximumAge: 0,          // disable cache
            desiredAccuracy: 30,    // meters
            fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
            addressLookup: true,    // requires Google API key if true
            timezone: true         // requires Google API key if true
        };
        
        return new Promise((resolve, reject) => {
            geolocator.locate(options, (error, location) => {
                if (error) reject(error);
                resolve(parseLocation(location));
            });
        }).catch(handleError);

    }
});

const parseLocation = locationData => {
    const coordinates = locationData[LocationResponseParameters.coords];
    const latitude = coordinates[LocationResponseParameters.latitude];
    const longitude = coordinates[LocationResponseParameters.longitude];
    const location = new Location(latitude, longitude);
    return location
}

const handleError = error => {
    console.warn(error);
    return null;
};

export default UserLocationRemoteDataSource;