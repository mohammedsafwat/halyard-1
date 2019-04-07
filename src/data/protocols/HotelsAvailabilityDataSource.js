import { Interface, type } from 'implement-js'

const HotelsAvailabilityDataSource = Interface('HotelsAvailabilityDataSource')({
    hotelsAvailability: type('function')
}, {
    error: true,
    strict: true
});

export default HotelsAvailabilityDataSource;