export default class HotelsAvailabilityFilter {
    constructor(checkIn, checkOut, latitude, longitude, room1, offset, rows) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.latitude = latitude;
        this.longitude = longitude;
        this.room1 = room1;
        this.offset = offset;
        this.rows = rows;
    }
}