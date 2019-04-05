import RestNetworkClient from '../../apiclients/RestNetworkClient'
import ApiConstants from '../../constants/ApiConstants'
import RequestType from '../../helpers/RequestType'
import Hotel from '../../models/Hotel';
import HotelResponseParameters from '../../helpers/HotelsResponseParameters'
import HotelData from '../../models/HotelData';

export const HotelsRemoteDataSource = implement(HotelsDataSource)({
    hotels(hotelsFilter) {
        const hotelsUrl = `${ApiConstants.baseUrl}${ApiConstants.hotelsEndpoint}`;
        const parameters = {
            city_ids: hotelsFilter.cityIds,
            offset: hotelsFilter.offset,
            rows: hotelsFilter.rows
        }
        const hotelsRespose = await RestNetworkClient.performRequest(hotelsUrl, RequestType.get, parameters);
        const hotels = hotelsRespose.result;
        hotels.map(hotel => {
            const hotelId = hotel[HotelResponseParameters.hotelId];
            const hotelData = parseHotelData(hotel[HotelResponseParameters.hotelData]);
            const roomData = parseRoomData(hotel[HotelResponseParameters.roomData]);
            return new Hotel(hotelId, hotelData, roomData);
        });
    }
});

function parseHotelData(hotelData) {
    const numberOfRooms = hotelData[HotelResponseParameters.hotelDataParameters.numberOfRooms];
    const location = hotelData[HotelResponseParameters.hotelDataParameters.location];
    const isClosed = hotelData[HotelResponseParameters.hotelDataParameters.isClosed];
    const hotelClass = hotelData[HotelResponseParameters.hotelDataParameters.hotelClass];
    const hotelDescription = hotelData[HotelResponseParameters.hotelDataParameters.hotelDescription];
    const ranking = hotelData[HotelResponseParameters.hotelDataParameters.ranking];
    const reviewScore = hotelData[HotelResponseParameters.hotelDataParameters.reviewScore];
    const cityId = hotelData[HotelResponseParameters.hotelDataParameters.cityId];
    const url = hotelData[HotelResponseParameters.hotelDataParameters.url];
    const hotelPhotos = hotelData[HotelResponseParameters.hotelDataParameters.hotelPhotos];
    const city = hotelData[HotelResponseParameters.hotelDataParameters.city];
    const country = hotelData[HotelResponseParameters.hotelDataParameters.country];
    const address = hotelData[HotelResponseParameters.hotelDataParameters.address];
    const numberOfReviews = hotelData[HotelResponseParameters.hotelDataParameters.numberOfReviews];
    const name = hotelData[HotelResponseParameters.hotelDataParameters.name];

    return HotelData(numberOfRooms, location, isClosed, hotelClass, hotelDescription, ranking, reviewScore, cityId, url, hotelPhotos, city, country, address, numberOfReviews, name);
}

function parseRoomData(roomData) {
    const roomName = roomData[HotelResponseParameters.roomDataParameters.roomName];
    const roomId = roomData[HotelResponseParameters.roomDataParameters.roomId];
    const roomPhotos = roomData[HotelResponseParameters.roomDataParameters.roomPhotos];
    const roomDescription = roomData[HotelResponseParameters.roomDataParameters.roomDescription];
    const roomInfo = roomData[HotelResponseParameters.roomDataParameters.roomInfo];

    return RoomData(roomName, roomId, roomPhotos, roomDescription, roomInfo);
}