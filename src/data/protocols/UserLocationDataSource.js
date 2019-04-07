import { Interface, type } from 'implement-js'

const UserLocationDataSource = Interface('UserLocationDataSource')({
    userLocation: type('function')
}, {
    error: true,
    strict: true
});

export default UserLocationDataSource;