const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMsg, results) => {
    if (errorMsg) {
        console.log(errorMsg);
    } else {
        console.log(`Address:     ${results.address}`);
        weather.getWeather(results.latitude, results.longitude, (errorMsg, results) => {
            if (errorMsg) {
                console.log(errorMsg);
            } else {
                console.log(`Summary:     ${results.summary}`);
                console.log(`Temperature: ${results.temperature}°C`);
                console.log(`Wind Speed:  ${results.windSpeed} km/h`);
            }
        });
    }
});

