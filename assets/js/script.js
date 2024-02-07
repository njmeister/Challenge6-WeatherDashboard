let cityDisplay = document.getElementById('cityName');
let cityInput = document.getElementById('cityInput');
let day1 = document.getElementById('1');
let day2 = document.getElementById('2');
let day3 = document.getElementById('3');
let day4 = document.getElementById('4');
let day5 = document.getElementById('5');
let days = [day1, day2, day3, day4, day5];
let search = document.getElementById('search');
let dateDisplay = document.getElementById('date');
let todayDisplay = document.getElementById('todayDisplay');
let date = dayjs().format('dddd, DD MMMM, YYYY');
let city;
let state;
let country;
var lat;
var lon;
var temp = [];
var tempMin = [];
var tempMax = [];
var humidity = [];
var wind = [];
var imgCode = [];
var dayNum = [];
var dayNumFix = [];
var todayTemp;
var todayHumidity;
var todayWind;
var todayImg;
var cityState;
let apiKey = 'bb2c3a3b4c0431fc296ddc5ca615d70c'

let cityError = document.getElementById('errorMsg');

let history = document.createElement('div');

let history1 = document.createElement('button');
let history2 = document.createElement('button');
let history3 = document.createElement('button');
let history4 = document.createElement('button');
let history5 = document.createElement('button');

search.appendChild(history);

cityDisplay.textContent = '';
dateDisplay.textContent = date;

history.classList.add('row', 'justify-content-center', 'my-4', 'my-lg-5');
history1.classList.add('mx-2', 'col-2', 'col-lg-12', 'my-lg-3');
history2.classList.add('mx-2', 'col-2', 'col-lg-12', 'my-lg-3');
history3.classList.add('mx-2', 'col-2', 'col-lg-12', 'my-lg-3');
history4.classList.add('mx-2', 'col-2', 'col-lg-12', 'my-lg-3');
history5.classList.add('mx-2', 'col-2', 'col-lg-12', 'my-lg-3');

history.addEventListener('click', function(button) {
  cityInput.value = button.target.textContent;
  saveCity();
})

cityInput.addEventListener('keydown', function(event) {
  if (event.code === 'Enter') {
    saveCity();
  }
})

function displayHistory() {
  history1.textContent = localStorage.getItem('history1');
  history2.textContent = localStorage.getItem('history2');
  history3.textContent = localStorage.getItem('history3');
  history4.textContent = localStorage.getItem('history4');
  history5.textContent = localStorage.getItem('history5');
  if (localStorage.getItem('history5')) {
    history.appendChild(history5);
  }
  if (localStorage.getItem('history4')) {
    history.appendChild(history4);
  }
  if (localStorage.getItem('history3')) {
    history.appendChild(history3);
  }
  if (localStorage.getItem('history2')) {
    history.appendChild(history2);
  }
  if (localStorage.getItem('history1')) {
    history.appendChild(history1);
  }

}

displayHistory();

function logCity() {
  if (!localStorage.getItem('history1')) {
    localStorage.setItem('history1', cityInput.value.toUpperCase());
  } else if (!localStorage.getItem('history2')) {
    localStorage.setItem('history2', cityInput.value.toUpperCase());
  } else if (!localStorage.getItem('history3')) {
    localStorage.setItem('history3', cityInput.value.toUpperCase());
  } else if (!localStorage.getItem('history4')) {
    localStorage.setItem('history4', cityInput.value.toUpperCase());
  } else if (!localStorage.getItem('history5')) {
    localStorage.setItem('history5', cityInput.value.toUpperCase());
  } else {
    localStorage.setItem('history1', localStorage.getItem('history2'));
    localStorage.setItem('history2', localStorage.getItem('history3'));
    localStorage.setItem('history3', localStorage.getItem('history4'));
    localStorage.setItem('history4', localStorage.getItem('history5'));
    localStorage.setItem('history5', cityInput.value.toUpperCase());
  }
}

function saveCity() {
  cityState = cityInput.value.split(',');
  city = cityState[0];
  state = cityState[1];

  cityError.classList.add('bg-light')
  cityError.classList.add('rounded')

  if (cityState.length != 2 || state.trim().length != 2) {
    cityError.textContent = 'Please enter in City, St format';
  } else {
    try {
      getGeo();

    } 
    catch(TypeError) {
      cityError.textContent = 'City Not Recognized'
    }
      cityDisplay.textContent = cityInput.value.toUpperCase();
      logCity();
}


}

function getGeo() {
  let geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',' + country + '&limit=5&appid=' + apiKey;
    fetch(geoURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
        getWeather();
        });
}

function getWeather() {

    let weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

          for (i=1; i<=5; i++) {
            temp[i-1] = data.list[(i*8)-1].main.temp;
            humidity[i-1] = data.list[(i*8)-1].main.humidity;
            wind[i-1] = data.list[(i*8)-1].wind.speed;
            imgCode[i-1] = data.list[(i*8)-1].weather[0].icon;
            dayNum[i-1] = data.list[(i*8)-1].dt_txt;
          }

          todayTemp = data.list[0].main.temp;
          todayHumidity = data.list[0].main.humidity;
          todayWind = data.list[0].wind.speed;
          todayImg = data.list[0].weather[0].icon;
          displayWeather();
        })
}

function displayWeather() {

  todayTempDisplay = document.createElement('h4');
  todayHumidityDisplay = document.createElement('h4');
  todayWindDisplay = document.createElement('h4');
  todayImgDisplay = document.createElement('img');

  todayTempDisplay.textContent = 'Temp: ' + todayTemp + '°F';
  todayHumidityDisplay.textContent = 'Humidity: ' + todayHumidity + '%';
  todayWindDisplay.textContent = 'Wind Speed: '+ todayWind + 'mph';

  todayTempDisplay.classList.add('col-4');
  todayHumidityDisplay.classList.add('col-4');
  todayWindDisplay.classList.add('col-4');


  todayImgDisplay.src = 'https://openweathermap.org/img/wn/' + todayImg + '@2x.png';
  todayDisplay.appendChild(todayImgDisplay);
  todayImgDisplay.classList.add('col-2');

  todayDisplay.classList.add('border', 'border-5');

  todayDisplay.appendChild(todayTempDisplay);
  todayDisplay.appendChild(todayHumidityDisplay);
  todayDisplay.appendChild(todayWindDisplay);

  for (i=0; i<5; i++) {

    dayNumFix[i] = dayNum[i].slice(0,10).replace(/-/g,'/');
    days[i].firstElementChild.innerHTML = dayNumFix[i];
    days[i].classList.add('card', 'col-2', 'my-4', 'bg-dark', 'text-light', 'p-2');

    symbol = document.createElement('img');
    symbol.src = 'https://openweathermap.org/img/wn/' + imgCode[i] + '@2x.png';
    days[i].appendChild(symbol);

    tempDisplay = document.createElement('p');
    tempDisplay.textContent = 'Temp: ' + temp[i] + '°F';
    days[i].appendChild(tempDisplay)

    humidityDisplay = document.createElement('p');
    humidityDisplay.textContent = 'Humidity: ' + humidity[i] + '%';
    days[i].appendChild(humidityDisplay)

    windDisplay = document.createElement('p');
    windDisplay.textContent = 'Wind Speed: '+ wind[i] + 'mph';
    days[i].appendChild(windDisplay)
  }
}