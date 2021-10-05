var myApi = "e74325500ef2f7e58fc93f84b3d13924";
var cityName = "austin";

var part = "minutely,hourly"

var latitude;
var longitude;

var oneCallApi;
var fiveDayApi;


function getCoordinates() {
  // assign API url to five day api variable
  fiveDayApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myApi}`

  // fetch the api url
  fetch(fiveDayApi) 
    // then run function with response
    .then(function (response) {
        if (response.ok) {
          // convert response to json
          response.json() .then( function(data) {
            console.log(data.coord.lat);
            console.log(data.coord.lon);

            latitude = data.coord.lat
            longitude = data.coord.lon

            getOneCallApi(latitude,longitude);
          })
        }
    })
}

getCoordinates();

function getOneCallApi (latitude, longitude) {
  oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${part}&appid=${myApi}`
  fetch(oneCallApi) 
    // then run function with response
    .then(function (response) {
        if (response.ok) {
          // convert response to json
          response.json() .then( function(data) {
            console.log(data);
            // get humidity
            console.log(data.current.humidity);
            var currentHumidity = data.current.humidity
            // get temperature
            console.log(data.current.temp);
            var currentTemperature = (data.current.temp-273.15)*(9/5) + 32;
            console.log(currentTemperature);
            // get uv index
            console.log(data.current.uvi);
            var currentUvi = data.current.uvi
            // get date and time
            console.log(data.current.dt);
            var currentDateTime = new Date (data.current.dt*1000)
            currentDateTime = currentDateTime.toLocaleDateString("en-US")
            console.log(currentDateTime)
            // get wind direction and speed
            console.log(data.current.wind_deg);
            console.log(data.current.wind_speed);
            var currentWindDirection = data.current.wind_deg
            var currentWindSpeed = data.current.wind_speed
            // get the current weather status
            console.log(data.current.weather[0].description);
            var currentWeatherStatus = data.current.weather[0].description
          // get the icon
            var currentIcon = data.current.weather[0].icon;
            console.log(currentIcon)
            
            // source for icon url
            var currentIconUrl = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`
            console.log(currentIconUrl);

            console.log(data.daily)

            for(var i = 1; i <= 5; i++) {
              console.log(data.daily[1]);
              // get humidity
              console.log(data.daily[i].humidity);
              var dailyHumidity = data.daily[i].humidity;
              // get day time temperature
              console.log(data.daily[i].temp.day);
              var dailyTemperature = data.daily[i].temp.day;
              // get date time
              console.log(data.daily[i].dt);
              var dailyDateTime = new Date(data.daily[i].dt);
              console.log(dailyDateTime);
              // daily weather status
              console.log(data.daily[i].weather[0].description);
              var dailyWeatherStatus = data.daily[i].weather[0].description;
              // get the icon
              console.log(data.daily[i].weather[0].icon);
              var dailyIcon = data.daily[i].weather[0].icon;
              // get wind speed
              console.log(data.daily[i].wind_speed);
              console.log(data.daily[i].wind_deg);
              var dailyWindSpeed = data.daily[i].wind_speed;
              var dailyWindDirection = data.daily[i].wind_deg;
              // get uvi
              var dailyUvi = data.daily[i].uvi
              console.log(data.daily[i].uvi);
            }
          })
        }
    })
}




