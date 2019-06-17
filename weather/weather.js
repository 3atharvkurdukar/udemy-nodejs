const request = require('request');

const getWeather = (latitude, longitude, callback) => {
    
    const apikey = '3f122ede83c58ba16ccd37edbfcd4c7c';
    const url = `https://api.darksky.net/forecast/${apikey}/${latitude},${longitude}?units=si`;
    // console.log(url);
    request(
        url, {
            json: true
        },
        (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined, {
                    summary: body.currently.summary,
                    temperature: body.currently.temperature,
                    windSpeed: body.currently.windSpeed
                });
            } else {
                callback('ERR: Unable to fetch weather', undefined);
            }
        }
    );
};

module.exports = {
    getWeather
};