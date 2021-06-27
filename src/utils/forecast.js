const request = require('postman-request')

const forecast = (latt, long, callback) => {

    const url='http://api.weatherstack.com/current?access_key=e075cfe65d9bcafb58c8e90241b9215f&query=' + latt + ',' + long

    request( {url , json:true} , (error, {body}) => {
        //const data = JSON.parse(response.body)
        //console.log(data.current)
        if( error ){
            callback('unable to connect ', undefined)
        }
        else if ( body.error){
            callback('please provide correct values', undefined)
        }
        else{
            // callback(undefined, body.current.temperature)
            callback(undefined, ' It is currently ' + 
            body.current.temperature + ' degress out. There is a ' + 
            body.current.precip + '% chance of rain.' + 
            'Currently humidity is ' + body.current.humidity +
            ' and weather consitions are ' + body.current.weather_descriptions[0])
        }
        //console.log('it is currently ' + response.body.current.temperature + ' degrees out')
    })
}

module.exports = forecast