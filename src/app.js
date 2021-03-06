const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Nikhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'Nikhil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'Nikhil'
    })
})

app.get('/weather', (req, res) => {
    const addressLoc = req.query.address
    if(!addressLoc){
        return res.send({
            error:'Provide correct input details'
        })
    }
    else{
        geocode(addressLoc,(error, {latitude, longitude, location} = {}) => {
            if(error)
            {
                return res.send({
                    error:'Provide correct input details'
                })
            }
            else{
                forecast(latitude, longitude, (error, forecastData) => {
                    if(error){
                        return res.send({
                            error:'Provide correct input details'
                        })
                    }
                    else{
                        //console.log(req.query.address)
                        res.send({
                            forecast : forecastData,
                            location,
                            address:addressLoc
                        })
                    }
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Nikhil',
        errorMessage:'Help Page not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title:'404',
        name:'Nikhil',
        errorMessage:'Page not found'
    })
})

app.listen(port, () =>{
    console.log('web server is running on ' + port + ' port')
})