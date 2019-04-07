import implement from 'implement-js'
import RestNetworkClient from '../../apiclients/RestNetworkClient'
import HotelsDataSource from '../../protocols/HotelsDataSource'
import ApiConstants from '../../constants/ApiConstants'
import RequestType from '../../helpers/RequestType'
import HotelsResponseParameters from '../../helpers/HotelsResponseParameters'
import Hotel from '../../models/static_data/Hotel'
import HotelData from '../../models/static_data/HotelData'
import RoomData from '../../models/static_data/RoomData'
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
            const hotelId = hotel[HotelsResponseParameters.hotelId];
            const hotelData = parseHotelData(hotel[HotelsResponseParameters.hotelData]);
            const roomsData = parseRoomsData(hotel[HotelsResponseParameters.roomData]);
            return new Hotel(hotelId, hotelData, roomsData);
        });
        return hotels;         
    }
});

const parseHotelData = hotelData => {
    if (hotelData) {
        const numberOfRooms = hotelData[HotelsResponseParameters.hotelDataParameters.numberOfRooms];
        const location = hotelData[HotelsResponseParameters.hotelDataParameters.location];
        const isClosed = hotelData[HotelsResponseParameters.hotelDataParameters.isClosed];
        const hotelClass = hotelData[HotelsResponseParameters.hotelDataParameters.class];
        const hotelDescription = hotelData[HotelsResponseParameters.hotelDataParameters.hotelDescription];
        const ranking = hotelData[HotelsResponseParameters.hotelDataParameters.ranking];
        const reviewScore = hotelData[HotelsResponseParameters.hotelDataParameters.reviewScore];
        const cityId = hotelData[HotelsResponseParameters.hotelDataParameters.cityId];
        const url = hotelData[HotelsResponseParameters.hotelDataParameters.url];
        const hotelPhotos = parsePhotos(hotelData[HotelsResponseParameters.hotelDataParameters.hotelPhotos]);
        const city = hotelData[HotelsResponseParameters.hotelDataParameters.city];
        const country = hotelData[HotelsResponseParameters.hotelDataParameters.country];
        const address = hotelData[HotelsResponseParameters.hotelDataParameters.address];
        const numberOfReviews = hotelData[HotelsResponseParameters.hotelDataParameters.numberOfReviews];
        const name = hotelData[HotelsResponseParameters.hotelDataParameters.name];

        return new HotelData(numberOfRooms, location, isClosed, hotelClass, hotelDescription, ranking, reviewScore, cityId, url, city, hotelPhotos, country, address, numberOfReviews, name);
    }
    return null;
};

const parseRoomsData = roomsData => {
    if (roomsData) {
        return roomsData.map(roomData => {
            const roomName = roomData[HotelsResponseParameters.roomDataParameters.roomName];
            const roomId = roomData[HotelsResponseParameters.roomDataParameters.roomId];
            const roomPhotos = parsePhotos(roomData[HotelsResponseParameters.roomDataParameters.roomPhotos]);
            const roomDescription = roomData[HotelsResponseParameters.roomDataParameters.roomDescription];
            const roomInfo = roomData[HotelsResponseParameters.roomDataParameters.roomInfo];
            return new RoomData(roomName, roomId, roomPhotos, roomDescription, roomInfo);
        })
    }
    return null;
};

const parsePhotos = photosData => {
    if (photosData) {
        return photosData.map(photo => {
            const urlOriginal = photo[HotelsResponseParameters.photoDataParameters.urlOriginal];
            const urlMax300 = photo[HotelsResponseParameters.photoDataParameters.urlMax300];
            const urlSquare60 = photo[HotelsResponseParameters.photoDataParameters.urlSquare60];
            return new Photo(urlOriginal, urlMax300, urlSquare60);
        });
    }
    return [];
};

const handleError = error => {
    console.warn(error);
    return null;
};

export default HotelsRemoteDataSource;