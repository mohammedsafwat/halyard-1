import { Interface, type } from 'implement-js'

const CitiesDataSource = Interface('CitiesDataSource')({
    cities: type('function')
}, {
    error: true,
    strict: true
});

export default CitiesDataSource;