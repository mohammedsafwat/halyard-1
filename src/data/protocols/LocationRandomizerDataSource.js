import { Interface, type } from 'implement-js'

const LocationRandomizerDataSource = Interface('LocationRandomizerDataSource')({
    randomLocation: type('function')
}, {
    error: true,
    strict: true
});

export default LocationRandomizerDataSource;