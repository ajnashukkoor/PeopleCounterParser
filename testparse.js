
const parser = require('./parser');
const c8yService = require('./c8yService');
var moment = require('moment');

var data = {"CountLogs":[{"Counts":[{"LogPeriodValue":0,"Name":"Line 1","RegisterId":0,"RegisterType":"Custom","Tags":["direction=IN"],"UUID":"93e95be9-6c02-4247-adbe-97e8036e555b","Value":72},{"LogPeriodValue":0,"Name":"Line 2","RegisterId":1,"RegisterType":"Custom","Tags":["direction=OUT"],"UUID":"3cc89f5a-507a-4903-9630-27f881a7d5f6","Value":76},{"LogPeriodValue":0,"Name":"TestZone","RegisterId":2,"RegisterType":"Zone","Tags":[],"UUID":"f439de2f-5c0a-473d-a805-a905cc158cb9","Value":0}],"LogEntryId":5360,"StartTimestamp":"2020-08-06T06:56:00Z","StartTimestampLocaltime":"2020-08-06T09:56:00+03:00","Timestamp":"2020-08-06T06:57:00Z","TimestampLocaltime":"2020-08-06T09:57:00+03:00"}],"DeviceID":"D001","DeviceName":"DefaultName","EnableDST":false,"FriendlyDeviceSerial":"V4D-20050095","HistogramLogs":[{"Histograms":[{"Name":"Line 1","RegisterId":"0","Tags":["direction=IN"],"UUID":"93e95be9-6c02-4247-adbe-97e8036e555b","Values":[{"config":{"binWidth":30,"minVal":110,"nBins":10,"type":"height"},"periodic_result":[0,0,0,0,0,0,0,0,0,0],"result":[0,0,0,0,0,0,0,0,0,0]}]},{"Name":"TestZone","RegisterId":"2","Tags":[],"UUID":"f439de2f-5c0a-473d-a805-a905cc158cb9","Values":[{"config":{"binWidth":50,"minVal":50,"nBins":8,"type":"total wait"},"periodic_result":[0,0,0,0,0,0,0,0],"result":[0,0,0,0,0,0,0,0]}]}],"LogEntryId":5360,"StartTimestamp":"2020-08-06T06:56:00Z","StartTimestampLocaltime":"2020-08-06T09:56:00+03:00","Timestamp":"2020-08-06T06:57:00Z","TimestampLocaltime":"2020-08-06T09:57:00+03:00"}],"IPv4Address":"192.168.100.128","IPv6Address":"fe80::221:acff:fe04:74d","SiteID":"S001","SiteName":"DefaultSiteName","TimeZone":"Asia/Riyadh","UserString":"Enrichai","macAddress":"00:21:AC:04:07:4D"};	
//const obj = JSON.parse(data);
console.log("DeviceID = :"+ data.DeviceID);
console.log("CountLogs:" + JSON.stringify(data.CountLogs));
console.log("CountLogs 1:" + JSON.stringify(data.CountLogs[0]));
console.log("CountLogs 1 Count 1:" + JSON.stringify(data.CountLogs[0].Counts[0]));
console.log("CountLogs 1 Count 1 Value in Line 1:" + parseInt((data.CountLogs[0].Counts[0].Value),10));
console.log("date 1:" + (data.CountLogs[0].TimestampLocaltime));
console.log("Histogram type is :"+ (data.HistogramLogs[0].Histograms[0].Values[0].type));
console.log("this is what" + (data.HistogramLogs[0].Histograms[0].Values[0].result));



/*
const sendDataToC8y = data => {
        let linecounts = [];
        //let date_ob = new Date();
	var i;

	for(i=0;i<(data.CountLogs[0].Counts.length);i++)
	{
	console.log("i = " + i);
	var c8yname = data.CountLogs[0].Counts[i].Name;
	console.log(c8yname); 

        if(data != undefined){
                linecounts.push({
                        source: {
                                "id": "307"
                        },
                        type: "c8y_LineCounts",
                        //time : moment(JSON.stringify(data.CountLogs[0].TimestampLocaltime)).utc().format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
                        time : (data.CountLogs[0].TimestampLocaltime),
                        c8y_LineCounts: {
                    	[c8yname] : {
                        "unit": "no.",
                        "value":  parseInt((data.CountLogs[0].Counts[i].Value),10)
                    }

                        },
                })

        }



        linecounts.forEach(linecounts => c8yService.sendMeasurement(linecounts))
}
}
*/

parser.sendDataToC8y(data);
parser.getDeviceProperties(data);
parser.sendHistogramToC8y(data);
//sendDataToC8y(data);

