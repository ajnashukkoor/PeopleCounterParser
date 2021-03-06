const c8yService = require('./c8yService');
const essential = require('./essential');
var moment = require('moment');
const c8yDeviceID = "5307";

const sendDataToC8y = data => {
        let linecounts = [];
	var duration = moment.duration((moment(data.CountLogs[0].TimestampLocaltime)).diff(moment(data.CountLogs[0].StartTimestampLocaltime)));
		var c8yPeriod = duration.asSeconds();
        	console.log("c8yPeriod ins Seconds:"+ c8yPeriod );

        for (i = 0; i < (data.CountLogs[0].Counts.length); i++) {
                console.log("Here----------------------------------i:" + i);
                var c8yLinename = data.CountLogs[0].Counts[i].Name;
                var c8yLineLogPeriodValueName = data.CountLogs[0].Counts[i].Name + "LogPeriodValue";
                console.log("c8yLinename :" + c8yLinename);
                console.log("c8yLineLogPeriodValueName:" + c8yLineLogPeriodValueName);

                if (data != undefined) {
                        linecounts.push({
                                source: {
                                        "id": c8yDeviceID
                                },
                                type: "c8y_LineCounts",
                                time: (data.CountLogs[0].TimestampLocaltime),
                                c8y_LineCounts: {
                                        [c8yLinename]: {
                                                "unit": "count",
                                                "value": parseInt((data.CountLogs[0].Counts[i].Value), 10)
                                        },
                                        [c8yLineLogPeriodValueName]: {
                                                "unit": "count",
                                                "value": parseInt((data.CountLogs[0].Counts[i].LogPeriodValue), 10)
                                        },

                                        "Duration": {
                                                "unit": "Seconds",
                                                "value": c8yPeriod
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


        if (data != undefined) {
                properties.push({
                        "Device ID": data.DeviceID,
                        "Device name": data.DeviceName,
                        "EnableDST": data.EnableDST,
                        "Serial No.": data.FriendlyDeviceSerial,
                        "IPv4Address": data.IPv4Address,
                        "IPv6Address": data.IPv6Address,
                        "SiteID": data.SiteID,
                        "SiteName": data.SiteName,
                        "TimeZone": data.TimeZone,
                        "UserString": data.UserString,
                        "macAddress": data.macAddress

                })

        }
        console.log(properties);

}


const sendHistogramToC8y = histo => {
        let histogram = [];
        let histoNbin = histo.HistogramLogs[0].Histograms[0].Values[0].config.nBins;
        let i = 0;
        //var c8yResultName = histo.HistogramLogs[0].Histograms[0].Values[0].result;


        for (i = 0; i < (histo.HistogramLogs[0].Histograms.length); i++) {

		var histogram_type = histo.HistogramLogs[0].Histograms[i].Values[0].config.type;
                var c8yHistoLinename = histo.HistogramLogs[0].Histograms[i].Name
                console.log("c8yHistoLinename:" + c8yHistoLinename);

		switch (histogram_type)
		{
		case "height":
		{

                if (histo != undefined) {
                        histogram.push({
                                source: {
                                        "id": c8yDeviceID
                                },
                                type: "c8y_Height_Histogram",
                                time: (histo.HistogramLogs[0].TimestampLocaltime),
                                [c8yHistoLinename]: {
                                        "Result": {
                                                "unit": "count",
                                                "value": (histo.HistogramLogs[0].Histograms[i].Values[0].result)
                                        },

                                        "PeriodicResult": {
                                                "unit": "count",
                                                "value": (histo.HistogramLogs[0].Histograms[i].Values[0].periodic_result)
                                        }


                                },
                        })


                }	
		}break;

                case "total wait":
                {

                if (histo != undefined) {
                        histogram.push({
                                source: {
                                        "id": c8yDeviceID
                                },
                                type: "c8y_Waittime_Histogram",
                                time: (histo.HistogramLogs[0].TimestampLocaltime),
                                [c8yHistoLinename]: {
                                        "Result": {
                                                "unit": "count",
                                                "value": (histo.HistogramLogs[0].Histograms[i].Values[0].result)
                                        },

                                        "PeriodicResult": {
                                                "unit": "count",
                                                "value": (histo.HistogramLogs[0].Histograms[i].Values[0].periodic_result)
                                        }



                                },
                        })


                } 
                }break;

		}
		console.log("sendinghistogramplease");
                histogram.forEach(histogram => c8yService.sendMeasurement(histogram))
        }

}

module.exports = {
        sendDataToC8y, sendHistogramToC8y, getDeviceProperties
}

