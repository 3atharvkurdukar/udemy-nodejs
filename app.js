const request = require('request');

request(
    'http://maps.googleapis.com/maps/api/geocode/json?address=shreeram%20residency%20kothrud%20pune',
    {
        json: true
    },
    (error, response, body) => {
        console.log(body);
    }
)