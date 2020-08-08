const express = require('express')
//var http = require("http");
const c8yService = require('./c8yService');
const parser = require('./parser');
var moment = require('moment');
const app = express()
            const port = 80



//app.get('/', (req, res) => res.send('Hello I am online!!, please use /startReading....'));



app.post ("/", function (request, response) {

    console.log("req: ", request.body, request.headers);
    const { headers, method, url } = request;
    let body = [];
    console.log("data start");
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
        console.log (body);
        const obj = JSON.parse(body);
        console.log (obj);
        parser.sendDataToC8y(obj);
        parser.sendHistogramToC8y(obj);

    });


    console.log("data end");
//	console.log(req);

    response.send('Done');
})


app.listen(port, () => console.log(`Server listening on port ${port}!`))
// // setInterval(printit,1000*4)

// printit()

// function printit(){
//      console.log("I am here")

// }
