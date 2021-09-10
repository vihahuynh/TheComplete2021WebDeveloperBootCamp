const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
    const query = req.body.city
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=8869f1aad0a79c92485461277782f69d&units=metric'
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            res.write('<p>The weather is currently ' + description + '</p>')
            res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degrees Celcius.</h1>')
            res.write('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png"/>')
            res.send()
        })
    })
})

app.listen(3000, function() {
    console.log('Server is running on port 3000.')
})
