const c8yService = require('./c8yService');
var moment = require('moment');

const sendDataToC8y = data => {
        let linecounts = [];
        //let date_ob = new Date();


        if(data != undefined){
                linecounts.push({
                        source: {
                                "id": "307"
                        },
                        type: "c8y_LineCounts",
                        time : (data.CountLogs[0].TimestampLocaltime),
                        c8y_LineCounts: {
                    "line1": {
                        "unit": "count",
                        "value":  parseInt((data.CountLogs[0].Counts[0].Value),10)
                    },
                    "line2": {
                        "unit": "count",
                        "value":  parseInt((data.CountLogs[0].Counts[1].Value),10)
                }

                        },
                })

        }



        linecounts.forEach(linecounts => c8yService.sendMeasurement(linecounts))
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



//	for (i=0;i=histoNbin;i++)
//	{
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
			   "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[0]),10)
			},
                        "Bin2Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[1]),10)
			},
                        "Bin3Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[2]),10)
                        },

                        "Bin4Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[3]),10)
                        },

                        "Bin5Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[4]),10)
                        },
                        "Bin6Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[5]),10)
                        },

                        "Bin7Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[6]),10)
                        },
                        "Bin8Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[7]),10)
                        },

                        "Bin9Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[8]),10)
                        },

                        "Bin10Result": {
                           "unit": "count",
                           "value": parseInt((histo.HistogramLogs[0].Histograms[0].Values[0].result[9]),10)
                        }

			
                        },
			})
			
		
	}

	histogram.forEach(histogram => c8yService.sendMeasurement(histogram))

//}
}

module.exports = {
		sendDataToC8y, sendHistogramToC8y
}

