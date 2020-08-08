var moment = require('moment');


data = {"CountLogs":[{"Counts":[{"LogPeriodValue":1,"Name":"Line 1","RegisterId":0,"RegisterType":"Line","Tags":["direction=IN"],"UUID":"93e95be9-6c02-4247-adbe-97e8036e555b","Value":4},{"LogPeriodValue":1,"Name":"Line 2","RegisterId":1,"RegisterType":"Custom","Tags":["direction=OUT"],"UUID":"3cc89f5a-507a-4903-9630-27f881a7d5f6","Value":7}],"LogEntryId":3994,"StartTimestamp":"2020-08-05T08:10:00Z","StartTimestampLocaltime":"2020-08-05T11:10:00+03:00","Timestamp":"2020-08-05T08:11:00Z","TimestampLocaltime":"2020-08-05T11:11:00+03:00"}],"DeviceID":"D001","DeviceName":"DefaultName","EnableDST":false,"FriendlyDeviceSerial":"V4D-20050095","HistogramLogs":[{"Histograms":[{"Name":"Line 1","RegisterId":"0","Tags":["direction=IN"],"UUID":"93e95be9-6c02-4247-adbe-97e8036e555b","Values":[{"config":{"binWidth":30,"minVal":110,"nBins":5,"type":"height"},"periodic_result":[0,1,1,0,0],"result":[0,3,1,0,0]}]}],"LogEntryId":3994,"StartTimestamp":"2020-08-05T08:10:00Z","StartTimestampLocaltime":"2020-08-05T11:10:00+03:00","Timestamp":"2020-08-05T08:11:00Z","TimestampLocaltime":"2020-08-05T11:11:00+03:00"}],"IPv4Address":"192.168.100.128","IPv6Address":"fe80::221:acff:fe04:74d","SiteID":"S001","SiteName":"DefaultSiteName","TimeZone":"Asia/Riyadh","UserString":"Enrichai","macAddress":"00:21:AC:04:07:4D"};

console.log("DeviceID = :"+ data.DeviceID);
console.log("CountLogs:" + JSON.stringify(data.CountLogs));
console.log("CountLogs 1:" + JSON.stringify(data.CountLogs[0]));
console.log("CountLogs 1 Count 1:" + JSON.stringify(data.CountLogs[0].Counts[0]));
console.log("CountLogs 1 Count 1 Value in Line 1:" + parseInt((data.CountLogs[0].Counts[0].Value),10));
console.log("date 1:" + (data.CountLogs[0].TimestampLocaltime));
console.log ("time1:"+ (data.CountLogs[0].TimestampLocaltime));
console.log ("time:" + (data.HistogramLogs[0].TimestampLocaltime));
console.log("nBin:"+ data.HistogramLogs[0].Histograms[0].Values[0].config.nBins);
console.log ("Bin1PeriodicResult:" + (data.HistogramLogs[0].Histograms[0].Values[0].periodic_result[0]));
console.log ("Bin1Result:" + (data.HistogramLogs[0].Histograms[0].Values[0].result[0]));
console.log ("Device ID :" + data.DeviceID);
console.log ("Device name :" + data.DeviceName);
console.log ("EnableDST :" + data.EnableDST);
console.log ("Serial No. :" + data.FriendlyDeviceSerial);
console.log ("IPv4Address :" + data.IPv4Address);
console.log ("IPv6Address :" + data.IPv6Address);
console.log ("SiteID :" + data.SiteID);
console.log ("SiteName :" + data.SiteName);
console.log ("TimeZone :" + data.TimeZone);
console.log ("UserString :" + data.UserString);
console.log ("macAddress :" + data.macAddress);
console.log ("Register name:"+ data.CountLogs[0].Counts[0].Name);


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
console.log ("Length:" + data.CountLogs[0].Counts.length);
UT COUNT
￼Scroll 

}



getDeviceProperties(data);
