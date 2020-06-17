const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&units=metric&%20exclude=hourly,daily&appid=51b16790c0b78faf86b86ac870b75821'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecasting services.',undefined)
        } else if (body.cod) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,{
                temp: body.current.temp,
                minTemp: body.daily[0].temp.min,
                maxTemp: body.daily[0].temp.max,
            })
        }
    })
}

module.exports = forecast