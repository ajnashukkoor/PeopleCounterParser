const c8yService = require('./c8yService');
const essential = require('./essential');
var moment = require('moment');

const sendDataToC8y = data => {
        let linecounts = [];
        //let date_ob = new Date();
	//var c8yPeriod = (data.CountLogs[0].TimestampLocaltime.getTime() - data.CountLogs[0].StartTimestampLocaltime.getTime());
	var start_date = JSON.stringify(data.CountLogs[0].StartTimestampLocaltime);
	var end_date = JSON.stringify(data.CountLogs[0].TimestampLocaltime);
//	var c8yPeriod = essential.calculateDuration(start_date,end_date);
//	console.log("c8yPeriod:"+ c8yPeriod);

	for (i=0; i < (data.CountLogs[0].Counts.length); i++)

{
	console.log ("Here----------------------------------i:" + i);
	var c8yLinename = data.CountLogs[0].Counts[i].Name;
	var c8yLineLogPeriodValueName = data.CountLogs[0].Counts[i].Name+"LogPeriodValue" ;
	console.log ("c8yLinename :" + c8yLinename);
	console.log ("c8yLineLogPeriodValueName:" + c8yLineLogPeriodValueName);

        if(data != undefined){
                linecounts.push({
                        source: {
                                "id": "307"
                        },
                        type: "c8y_LineCounts",
                        time : (data.CountLogs[0].TimestampLocaltime),
                        c8y_LineCounts: {
                    [c8yLinename]: {
                        "unit": "count",
                        "value":  parseInt((data.CountLogs[0].Counts[i].Value),10)
                    },
                    [c8yLineLogPeriodValueName]: {
                        "unit": "count",
                        "value":  parseInt((data.CountLogs[0].Counts[i].LogPeriodValue),10)
                    },

                    "Duration": {
                        "unit": "Seconds",
                        "value":  moment ((data.CountLogs[0].TimestampLocaltime)-(data.CountLogs[0].StartTimestampLocaltime))
                    } 
			

			

                        },
                })

        }



        linecounts.forEach(linecounts => c8yService.sendMeasurement(linecounts))
}
}


const getDeviceProperties = data => {
        let properties = [];
        //let date_ob = new Date(); 


        if(data != undefined){
                properties.push({
                "Device ID" : data.DeviceID,
                "Device name": data.DeviceName,
                "EnableDST":  data.EnableDST,
                "Serial No.": data.FriendlyDeviceSerial,
                "IPv4Address":  data.IPv4Address,
                "IPv6Address": data.IPv6Address,
                "SiteID": data.SiteID,
                "SiteName":  data.SiteName,
                "TimeZone": data.TimeZone,
                "UserString":  data.UserString,
                "macAddress":  data.macAddress

                })

        }
console.log (properties);

}


const sendHistogramToC8y = histo => {
	let histogram = [];
	let histoNbin = histo.HistogramLogs[0].Histograms[0].Values[0].config.nBins;
	let i=0;
	//var c8yResultName = histo.HistogramLogs[0].Histograms[0].Values[0].result;
	var result = [histoNbin];


for (i=0; i < (histo.HistogramLogs[0].Histograms.length); i++)
{

var c8yHistoLinename = histo.HistogramLogs[0].Histograms[i].Name
console.log("c8yHistoLinename:"+c8yHistoLinename);
	if (histo != undefined){
		histogram.push({
			source:{
				"id": "307"
			},
			type: "c8y_Histogram",
			time: (histo.HistogramLogs[0].TimestampLocaltime),
			c8y_Histogram: {
                        "Bin1Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[i].Values[0].result),10)
                        }

			
                        },
			})
			
		
	}

	histogram.forEach(histogram => c8yService.sendMeasurement(histogram))
}

}

module.exports = {
		sendDataToC8y, sendHistogramToC8y, getDeviceProperties
}

