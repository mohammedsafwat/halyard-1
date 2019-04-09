import { Interface, type } from 'implement-js'

const DateUtilsProtocol = Interface('DateUtilsProtocol')({
    now: type('object'),
    nowDate: type('function'),
    nextMonthsDate: type('function')
}, {
    error: true,
    strict: true
});

export default DateUtilsProtocol;