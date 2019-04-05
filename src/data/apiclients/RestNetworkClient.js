import axios from 'axios'
import implement from 'implement-js'
import RequestType from '../helpers/RequestType'
import RestNetworkClientProtocol from '../protocols/RestNetworkClientProtocol'

const RestNetworkClient = implement(RestNetworkClientProtocol)({
    async performRequest(requestUrl, requestType, parameters, headers={}, auth={}) {
        const response = await requestType === RequestType.get ?
            axios.get(requestUrl, {
                params: parameters,
                headers: headers,
                auth: auth
            }) : 
            axios.post(requestUrl,
                parameters, {
                headers: headers,
                auth: auth
            });
        return response;
    }
});

export default RestNetworkClient;