# Weather Micro Service
Micro service for getting weather prediction for a city for next 3 days

## Requirements:
* Node.JS version v10.24.0
 or higher
 
## Steps to run the project
1. Clone the repository (**`git clone git@github.com:afeem-93/weather-micro-service.git`**)
1. Checkout master branch (**`git checkout master`**)
1. Install dependencies (**`npm install`**)
1. Add Environment Variable: **`OPEN_WEATHER_API_KEY`** (present inside the zip)
1. Run the app (**`node index.js`**)
1. Open browser and run *`localhost:8000/`*

## APIs
    GET /
    Returns inital HTML containing a basic form for fetching weather details for a city.


    POST /get-weather-info
    Body: {city: "city name"}
    
    Status Codes:
        200: Returns JSON containing HTML string as data for the specified city
        400: Return JSON containing a string with error message
        500: Return JSON containing a string with error message
    