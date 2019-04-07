export default class HotelAvailability {
    constructor(reviewScoreWord, hotelId, stars, price, address, reviewScore, hotelName, postCode, country, hotelCurrencyCode, reviewNumber) {
        this.reviewScoreWord = reviewScoreWord;
        this.hotelId = hotelId;
        this.stars = stars;
        this.price = price;
        this.address = address;
        this.reviewScore = reviewScore;
        this.hotelName = hotelName;
        this.postCode = postCode;
        this.country = country;
        this.hotelCurrencyCode = hotelCurrencyCode;
        this.reviewNumber = reviewNumber;
    }
}