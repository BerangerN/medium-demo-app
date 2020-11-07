const functions = require('firebase-functions');

exports.checkTemperature = functions.https.onRequest((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const temperature = req.query.temperature
    let message = ""

    if (temperature > 38) {
        message = "I guess you are sick!"
    } else if (temperature < 36) {
        message = "Stop drinking ice tea!"
    } else {
        message = "You are okay!"
    }

    const response = {
        status: 200,
        message
    }

    res.send(response)

});