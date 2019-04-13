import implement from 'implement-js'
import dateFormat from 'dateformat'
import DateUtilsProtocol from 'data/protocols/DateUtilsProtocol'

const DateUtils = implement(DateUtilsProtocol)({
    now: new Date(),
    nowDate() {
        return dateFormat(this.now, "yyyy-mm-dd");
    },
    nextDaysDate(numberOfDays) {
        return dateFormat(new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate() + numberOfDays), "yyyy-mm-dd");
    }
});

export default DateUtils;