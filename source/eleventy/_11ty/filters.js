const {DateTime} = require("luxon");

const dateToFormat = function (date, format) {
    return DateTime.fromJSDate(date).setZone("utc").toFormat(format);
}

module.exports = {
    dateToFormat
};