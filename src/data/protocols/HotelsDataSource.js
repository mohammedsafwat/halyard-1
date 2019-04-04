const HotelsDataSource = Interface('HotelsDataSource')({
    hotels: type('function')
}, {
    error: true,
    strict: true
})