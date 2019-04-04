import RestNetworkClient from '../../apiclients/RestNetworkClient'
import ApiConstants from '../../constants/ApiConstants'

const HotelsRemoteDataSource = implement(HotelsDataSource)({
    hotels() {
        const hotelsUrl = `${ApiConstants.baseUrl}${ApiConstants.hotelsEndpoint}`;
        const hotels = await RestNetworkClient.performRequest(hotelsUrl);
    }
});