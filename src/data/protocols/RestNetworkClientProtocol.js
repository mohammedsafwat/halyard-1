import { Interface, type } from 'implement-js'

const RestNetworkClientProtocol = Interface('RestNetworkClientProtocol')({
    performRequest: type('function')
}, {
    error: true,
    strict: true
});

export default RestNetworkClientProtocol;
