const express = require('express')
const app = express();
const port = 8000;
const cors = require('cors');
const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const fetch = require("node-fetch");
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  return res.sendFile("index.html", {root: __dirname});
});

app.post('/get-weather-info', (req, res) => {
    const city = req.body.city;
    
    if (!city || city === "") {
        return sendResponse(res, 400, "Please enter city name");
    }

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) {
                return sendResponse(res, 500, "Error fetching data for the city");
            }
            return response.json();
        })
        .then(data => {
            
            data.list = data.list.slice(1,4);
            let html = `<p>Forecast for next 3 days for ${data.city.name}, ${data.city.country}</p><br>`
            data.list.forEach((day, index) => {
                const date = new Date(day.dt*1000);
                let message = day.weather[0].main;
                if (day.temp_max > 40) {
                    message = "Use sunscreen lotion";
                } else if (message.toLowerCase().indexOf("rain") > -1) {
                    message = "Carry an Umbrella";
                }
                html += `<div style="float:${index === data.length - 1 ? 'right' : 'left'}; width:33%">
                    <p>Date: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
                    <p>Maximum Temperature: ${day.main.temp_max} &#8451</p>
                    <p>Minimum Temperature: ${day.main.temp_min} &#8451</p>
                    <p><b>${message}</b></p>
                </div>`;
            });
            return sendResponse(res, 200, html);
        })
        .catch(error => {
            return sendResponse(res, 500, "Error fetching data");
        });
});

function sendResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    return res.send({data});
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});