export default class RoomAvailability {
    constructor(roomId, roomTypeId, paymentTerms, price, depositRequired, adults, refundable, roomName, numberOfRoomsAvailableAtThisPrice) {
        this.roomId = roomId;
        this.roomTypeId = roomTypeId;
        this.paymentTerms = paymentTerms;
        this.price = price;
        this.depositRequired = depositRequired;
        this.adults = adults;
        this.refundable = refundable;
        this.roomName = roomName;
        this.numberOfRoomsAvailableAtThisPrice = numberOfRoomsAvailableAtThisPrice;
    }
}