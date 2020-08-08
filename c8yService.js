const request = require('request');

const tenant = "http://peoplecounter.iotsolutionbuilder.ooredoo.qa"
const auth = "Basic " + new Buffer.from("ooredoodev:ooredoo@123").toString('base64')

const sendMeasurement = (obj) => {
	const url = `${tenant}/measurement/measurements`;
	const payload = obj;

	// making an http call to cumulocity:
	const options = {
		method: "POST",
		uri: url,
		headers: {
			"Authorization": auth
		},
		json: payload
	}
	console.log(options)

	return new Promise(function (resolve, reject){
		request(options, function(error, response, body){
			console.log(response.statusCode)
			console.log(JSON.stringify(body))
		})
	})
}

module.exports = {
	sendMeasurement
}
