import axios from 'axios'
import RequestType from '../helpers/RequestType'

export const RestNetworkClient = implement(RestNetworkClientProtocol)({
    async performRequest(requestUrl, requestType, parameters) {
        const response = await requestType == RequestType.get ?
                        axios.get(requestUrl, { parameters }) : axios.post(requestUrl, parameters);
        return response;
    }
});