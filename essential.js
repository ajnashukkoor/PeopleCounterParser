function calculateDuration(startDate,endDate)
{
   var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   var duration = moment.duration(end_date.diff(start_date));
   var durationinSeconds = duration.asSeconds();
   return durationinSeconds;
}

module.exports
{
	calculateDuration
}
