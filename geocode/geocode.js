const request = require('request');

const geocodeAddress = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);
    
    request(
        `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`, {
            json: true
        },
        (error, response, body) => {
            if (error) {
                callback('ERR: Unable to connect to Google servers', undefined);
            } else if (body.status === 'ZERO_RESULTS') {
                callback('ERR: Unable to find address', undefined);
            } else if (body.status === 'OK') {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else if (body.status === 'OVER_QUERY_LIMIT') {
                callback('ERR: The server is flooding! Please try after some time...', undefined);
            }
        }
    );
}

module.exports = {
    geocodeAddress
}