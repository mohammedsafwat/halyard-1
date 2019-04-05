import implement from 'implement-js'
import RestNetworkClient from '../../apiclients/RestNetworkClient'
import HotelsDataSource from '../../protocols/HotelsDataSource'
import ApiConstants from '../../constants/ApiConstants'
import RequestType from '../../helpers/RequestType'
import HotelResponseParameters from '../../helpers/HotelsResponseParameters'
import Hotel from '../../models/Hotel'
import HotelData from '../../models/HotelData'
import RoomData from '../../models/RoomData'
import Photo from '../../models/Photo'

const HotelsRemoteDataSource = implement(HotelsDataSource)({
    async hotels(hotelsFilter) {
        const hotelsUrl = `${ApiConstants.corsProxyUrl}${ApiConstants.baseUrl}${ApiConstants.hotelsEndpoint}`;
        const parameters = {
            city_ids: hotelsFilter.cityIds,
            offset: hotelsFilter.offset,
            rows: hotelsFilter.rows,
            extras: "hotel_info,room_info,hotel_photos,room_photos,hotel_description,room_description"
        }
        const auth = ApiConstants.authentication;
        const hotelsResponse = await RestNetworkClient.performRequest(hotelsUrl, RequestType.get, parameters, {}, auth)
            .catch(error => {
                handleError(error);
                return [];
            });

        const hotelsData = hotelsResponse.data.result;
        const hotels = hotelsData.map(hotel => {
            const hotelId = hotel[HotelResponseParameters.hotelId];
            const hotelData = parseHotelData(hotel[HotelResponseParameters.hotelData]);
            const roomsData = parseRoomsData(hotel[HotelResponseParameters.roomData]);
            return new Hotel(hotelId, hotelData, roomsData);
        });
        return hotels;         
    }
});

function parseHotelData(hotelData) {
    if (hotelData) {
        const numberOfRooms = hotelData[HotelResponseParameters.hotelDataParameters.numberOfRooms];
        const location = hotelData[HotelResponseParameters.hotelDataParameters.location];
        const isClosed = hotelData[HotelResponseParameters.hotelDataParameters.isClosed];
        const hotelClass = hotelData[HotelResponseParameters.hotelDataParameters.class];
        const hotelDescription = hotelData[HotelResponseParameters.hotelDataParameters.hotelDescription];
        const ranking = hotelData[HotelResponseParameters.hotelDataParameters.ranking];
        const reviewScore = hotelData[HotelResponseParameters.hotelDataParameters.reviewScore];
        const cityId = hotelData[HotelResponseParameters.hotelDataParameters.cityId];
        const url = hotelData[HotelResponseParameters.hotelDataParameters.url];
        const hotelPhotos = parsePhotos(hotelData[HotelResponseParameters.hotelDataParameters.hotelPhotos]);
        const city = hotelData[HotelResponseParameters.hotelDataParameters.city];
        const country = hotelData[HotelResponseParameters.hotelDataParameters.country];
        const address = hotelData[HotelResponseParameters.hotelDataParameters.address];
        const numberOfReviews = hotelData[HotelResponseParameters.hotelDataParameters.numberOfReviews];
        const name = hotelData[HotelResponseParameters.hotelDataParameters.name];

        return new HotelData(numberOfRooms, location, isClosed, hotelClass, hotelDescription, ranking, reviewScore, cityId, url, city, hotelPhotos, country, address, numberOfReviews, name);
    }
    return null;
}

function parseRoomsData(roomsData) {
    if (roomsData) {
        return roomsData.map(roomData => {
            const roomName = roomData[HotelResponseParameters.roomDataParameters.roomName];
            const roomId = roomData[HotelResponseParameters.roomDataParameters.roomId];
            const roomPhotos = parsePhotos(roomData[HotelResponseParameters.roomDataParameters.roomPhotos]);
            const roomDescription = roomData[HotelResponseParameters.roomDataParameters.roomDescription];
            const roomInfo = roomData[HotelResponseParameters.roomDataParameters.roomInfo];

            return new RoomData(roomName, roomId, roomPhotos, roomDescription, roomInfo);
        })
    }
    return null;
}

function parsePhotos(photosData) {
    if (photosData) {
        return photosData.map(photo => {
            const urlOriginal = photo[HotelResponseParameters.photoDataParameters.urlOriginal];
            const urlMax300 = photo[HotelResponseParameters.photoDataParameters.urlMax300];
            const urlSquare60 = photo[HotelResponseParameters.photoDataParameters.urlSquare60];
            return new Photo(urlOriginal, urlMax300, urlSquare60);
        });
    }
    return [];
}

function handleError(error) {
    console.warn(error);
    return null;
}

export default HotelsRemoteDataSource;