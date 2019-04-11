import implement from 'implement-js'
import RestNetworkClient from 'data/apiclients/RestNetworkClient'
import HotelsAvailabilityDataSource from 'data/protocols/HotelsAvailabilityDataSource'
import ApiConstants from 'data/constants/ApiConstants'
import RequestType from 'data/helpers/RequestType'
import HotelAvailability from 'data/models/dynamic_data/HotelAvailability'
import HotelsAvailabilityResponseParameters from 'data/helpers/HotelsAvailabilityResponseParameters'

const HotelsAvailabilityRemoteDataSource = implement(HotelsAvailabilityDataSource)({
    async hotelsAvailability(hotelsAvailabilityFilter) {
        const hotelsAvailabilityUrl = `${ApiConstants.corsProxyUrl}${ApiConstants.baseUrl}${ApiConstants.hotelsAvailabilityEndpoint}`;
        const parameters = {
            checkin: hotelsAvailabilityFilter.checkIn,
            checkout: hotelsAvailabilityFilter.checkOut,
            latitude: hotelsAvailabilityFilter.latitude,
            longitude: hotelsAvailabilityFilter.longitude,
            room1: hotelsAvailabilityFilter.room1,
            offset: hotelsAvailabilityFilter.offset,
            rows: hotelsAvailabilityFilter.rows,
            extras: "room_details,hotel_details,payment_terms"
        }
        const auth = ApiConstants.authentication;
        const hotelsAvailabilityResponse = await RestNetworkClient.performRequest(hotelsAvailabilityUrl, RequestType.get, parameters, {}, auth)
            .catch(error => {
                handleError(error);
                return [];
            });
        const hotelsAvailabilityData = hotelsAvailabilityResponse.data.result;
        const hotelsAvailability = hotelsAvailabilityData.map(hotelAvailabilityData => {
            return parseHotelAvailability(hotelAvailabilityData)
        });
        return hotelsAvailability;
    }
});

const parseHotelAvailability = hotelAvailabilityData => {
    if (hotelAvailabilityData) {
        const reviewScoreWord = hotelAvailabilityData[HotelsAvailabilityResponseParameters.reviewScoreWord];
        const hotelId = hotelAvailabilityData[HotelsAvailabilityResponseParameters.hotelId];
        const stars = hotelAvailabilityData[HotelsAvailabilityResponseParameters.stars];
        const price = hotelAvailabilityData[HotelsAvailabilityResponseParameters.price];
        const address = hotelAvailabilityData[HotelsAvailabilityResponseParameters.address];
        const reviewScore = hotelAvailabilityData[HotelsAvailabilityResponseParameters.reviewScore];
        const hotelName = hotelAvailabilityData[HotelsAvailabilityResponseParameters.hotelName];
        const postCode = hotelAvailabilityData[HotelsAvailabilityResponseParameters.postCode];
        const country = hotelAvailabilityData[HotelsAvailabilityResponseParameters.country];
        const hotelCurrencyCode = hotelAvailabilityData[HotelsAvailabilityResponseParameters.hotelCurrencyCode];
        const reviewNumber = hotelAvailabilityData[HotelsAvailabilityResponseParameters.reviewNumber];
        return new HotelAvailability(reviewScoreWord, hotelId, stars, price, address, reviewScore, hotelName, postCode, country, hotelCurrencyCode, reviewNumber);
    }
    return null;
};

const handleError = error => {
    console.warn(error);
    return null;
};

export default HotelsAvailabilityRemoteDataSource;