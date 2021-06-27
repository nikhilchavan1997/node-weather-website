const request = require('postman-request')

const geocode = (address, callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibjFjazA5NyIsImEiOiJja3FidjRid2QwYW1uMnZwNzR0dGV6Zjl1In0.Yq-NtHg8wUo8mh7FcI-Cgg&Limit=1'
    request ({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to geolocation service.',undefined)
            //console.log('Unable to connect to geolocation service.')
        }
        else if(body.features.length === 0){
            callback('Please enter valid details',undefined)
            //console.log('')
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })//console.log('lattitude is' + latt + '  ' + 'Longitude is ' + long )
        }
    })
}

module.exports = geocode