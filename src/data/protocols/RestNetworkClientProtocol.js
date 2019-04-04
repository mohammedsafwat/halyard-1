const RestNetworkClientProtocol = Interface('RestNetworkClientProtocol')({
    performRequest: type('function')
}, {
    error: true,
    strict: true
})