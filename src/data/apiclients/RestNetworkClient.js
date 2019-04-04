import axios from 'axios'
import RequestType from '../helpers/RequestType'

export const RestNetworkClient = implement(RestNetworkClientProtocol)({
    async performRequest(requestUrl, requestType, params) {
        const result = await requestType == RequestType.get ?
                        axios.get(requestUrl, { params }) : axios.post(requestUrl, params);
        return result;
    }
});