const ApiConstants = {
    authentication: process.env.REACT_APP_BOOKING_AUTH_CREDENCIALS,
    baseUrl: 'https://distribution-xml.booking.com/2.4/json/',
    corsProxyUrl: 'https://cors-anywhere.herokuapp.com/',
    hotelsEndpoint: 'hotels',
    hotelsAvailabilityEndpoint: 'hotelAvailability',
    citiesEndpoint: 'cities',
    googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY
}

export default ApiConstants;