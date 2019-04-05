import { Interface, type } from 'implement-js'

const HotelsDataSource = Interface('HotelsDataSource')({
    hotels: type('function')
}, {
    error: true,
    strict: true
});

export default HotelsDataSource;