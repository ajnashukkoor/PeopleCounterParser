const moment = require('moment');
function calculateDays(startDate,endDate)
{
   var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   var duration = moment.duration(end_date.diff(start_date));
   var days = duration.asSeconds();       
   return days;
}

var startDate = ("2020-08-06T09:56:00+03:00");
var endDate = ("2020-08-06T09:57:00+03:00");
var duration = calculateDays(startDate,endDate);
console.log("duration:"+duration);
