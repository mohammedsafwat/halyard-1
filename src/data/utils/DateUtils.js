import implement from 'implement-js'
import dateFormat from 'dateformat'
import DateUtilsProtocol from 'data/protocols/DateUtilsProtocol'

const DateUtils = implement(DateUtilsProtocol)({
    now: new Date(),
    nowDate() {
        return dateFormat(this.now, "yyyy-mm-dd");
    },
    nextMonthsDate(numberOfMonth) {
        return dateFormat(new Date(this.now.getFullYear(), this.now.getMonth() + numberOfMonth, 1), "yyyy-mm-dd");
    }
});

export default DateUtils;