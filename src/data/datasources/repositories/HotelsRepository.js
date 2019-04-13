import DateUtils from '../../utils/DateUtils'
import HotelsAvailabilityRemoteDataSource from '../remote/HotelsAvailabilityRemoteDataSource'
import HotelsAvailabilityFilter from '../../models/dynamic_data/HotelsAvailabilityFilter'
import HotelsDataSource from '../../protocols/HotelsDataSource'
import HotelsFilter from '../.././models/static_data/HotelsFilter'
import HotelsRemoteDataSource from '../remote/HotelsRemoteDataSource'
import implement from 'implement-js'
import HotelCardData from '../../../presentation/HotelCardData';

const HotelsRepository = implement(HotelsDataSource)({
    async hotels(city, offset, rows) {
        const hotelsData = await fetchHotelsData(city, offset, rows);
        return hotelsData;
    }
});

const fetchHotelsData = async (city, offset, rows) => {
    let hotelsCardsData = []
    if (city) {
        const hotelsAvailabilityFilter = new HotelsAvailabilityFilter(DateUtils.nowDate(), DateUtils.nextDaysDate(1), city.location.latitude, city.location.longitude, 'A,A', offset, rows);
        const hotelsAvailabilityData = await fetchHotelsAvailability(hotelsAvailabilityFilter);
        if (hotelsAvailabilityData.length > 0) {
            const hotelIds = hotelsAvailabilityData.map(hotelAvailability => {
                return hotelAvailability.hotelId;
              }).join(',');
            const hotelsFilter = new HotelsFilter(hotelIds, 0, 10);
            const hotels = await fetchHotels(hotelsFilter);
            if (hotels) {
                hotels.forEach(hotel => {
                    let hotelPrice = ""
                    let hotelCurrencyCode = ""
                    const hotelImage = hotel.hotelData.hotelPhotos.length > 0 ? hotel.hotelData.hotelPhotos[0].urlOriginal : "https://via.placeholder.com/300";
                    const hotelAvailability = hotelsAvailabilityData.filter(hotelAvailability => hotelAvailability.hotelId === hotel.hotelId);
                    if (hotelAvailability.length > 0) {
                        hotelPrice = hotelAvailability[0].price;
                        hotelCurrencyCode = hotelAvailability[0].currencyCode;
                    }
                    const hotelCardData = new HotelCardData(hotel.hotelId, hotelImage, hotel.hotelData.reviewScore, hotelPrice, hotel.hotelData.url, `${hotel.hotelData.name} Photo`, hotelCurrencyCode);
                    hotelsCardsData.push(hotelCardData);
                });
            }
        }
    }
    return hotelsCardsData;
  };

const fetchHotels = async (hotelsFilter) => {
    return await HotelsRemoteDataSource.hotels(hotelsFilter);
}

const fetchHotelsAvailability = async (hotelsAvailabilityFilter) => {
    return await HotelsAvailabilityRemoteDataSource.hotelsAvailability(hotelsAvailabilityFilter);
}

export default HotelsRepository;