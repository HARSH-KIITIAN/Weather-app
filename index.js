const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/", (req,res)=>{
    const city = req.body.cityName;
    const apikey = req.body.apikey;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=apikey";
    http.get(url, (response)=>{
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write("<h1>The temperature is "+temp+" degree celcius"+"</h1>")
            res.write("<p>Weather is currently "+desc+"</p>");
            res.write(`<img src='https://openweathermap.org/img/wn/${icon}@2x.png' alt='weather icon'>`)
            res.send();
        })
    })
})

app.listen(3000, ()=>{
    console.log("Server is running on port 3000.");
})
