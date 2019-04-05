export default class HotelData {
    constructor(numberOfRooms, location, isClosed, hotelClass, hotelDescription, ranking, reviewScore, cityId, url, city, hotelPhotos, country, address, numberOfReviews, name) {
        this.numberOfRooms = numberOfRooms;
        this.location = location;
        this.isClosed = isClosed;
        this.hotelClass = hotelClass;
        this.hotelDescription = hotelDescription;
        this.ranking = ranking;
        this.reviewScore = reviewScore;
        this.cityId = cityId;
        this.url = url;
        this.hotelPhotos = hotelPhotos;
        this.city = city;
        this.country = country;
        this.address = address;
        this.numberOfReviews = numberOfReviews;
        this.name = name;
    }
}