const axios = require('axios');

const access_key = '32294cab391e82dd2eaea5816b5f2986';

const getExchangeRate = (from, to) => {
    const url = `http://data.fixer.io/api/convert?access_key=${access_key}&from=${from}&to=${to}&amount=1`;
    console.log(url);
    return axios.get(url)
    .then((response) => {
        return response.data.rates[to];
    });
};

getExchangeRate('USD', 'INR').then((rate) => {
    console.log(rate);
}).catch((err) => {
    console.log(err);
});
