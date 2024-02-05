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

// for (i=0; i<5; i++) {
//   days[i].firstElementChild.innerHTML = dayjs().add(i, 'day').format('MM/DD/YY');
// }

history.addEventListener('click', function(button) {
  cityInput.value = button.target.textContent;
  console.log(cityInput.value)
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
  state = cityState[1].trim();

  if (cityState.length != 2 || state.length != 2) {
    console.log('Please enter in City, St format')
    cityError.textContent = 'Please enter in City, St format';
    cityError.classList.add('bg-light')
    cityError.classList.add('rounded')
    return
  } else {
    console.log(cityInput.value);
    cityDisplay.textContent = cityInput.value.toUpperCase();
    console.log(city);
    console.log(state);
    logCity();
    getGeo();
  }
}

function getGeo() {
  let geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + state + ',' + country + '&limit=5&appid=' + apiKey;
    fetch(geoURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        lat = data[0].lat;
        lon = data[0].lon;
        console.log(lat + ', ' + lon)
        
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

          for (i=0; i<5; i++) {
            temp[i] = data.list[i*8].main.temp;
            // tempMin[i] = data.list[i*8].main.temp_min;
            // tempMax[i] = data.list[i*8].main.temp_max;
            humidity[i] = data.list[i*8].main.humidity;
            wind[i] = data.list[i*8].wind.speed;
            imgCode[i] = data.list[i*8].weather[0].icon;
          }

          console.log(data);
          console.log(temp);
          console.log(imgCode);
          displayWeather();
        })
}

function displayWeather() {

  console.log('Temp' + temp)
  console.log('TempMin' + tempMin)
  console.log('TempMax' + tempMax)
  console.log('Humidity' + humidity)
  console.log('Wind Speed' + wind)

  
  for (i=0; i<5; i++) {

    // fetch('https://openweathermap.org/img/wn/' + imgCode[i] + '@2x.png')
    //   .then(function (response) {
    //     return response;
    //   })
    //   .then(function (data){
    //     console.log(data)
    //   })

    days[i].firstElementChild.innerHTML = dayjs().add(i, 'day').format('MM/DD/YY');
    days[i].classList.add('card', 'col-2', 'my-4', 'bg-dark', 'text-light', 'p-2');

    symbol = document.createElement('img');
    symbol.src = 'https://openweathermap.org/img/wn/' + imgCode[i] + '@2x.png';
    days[i].appendChild(symbol);

    tempDisplay = document.createElement('p');
    tempDisplay.textContent = 'Temp: ' + temp[i] + '°F';
    days[i].appendChild(tempDisplay)

    // tempMaxDisplay = document.createElement('p');
    // tempMaxDisplay.textContent = 'High: ' + tempMax[i] + '°F';
    // days[i].appendChild(tempMaxDisplay)

    // tempMinDisplay = document.createElement('p');
    // tempMinDisplay.textContent = 'Low: ' + tempMin[i] + '°F';
    // days[i].appendChild(tempMinDisplay)

    humidityDisplay = document.createElement('p');
    humidityDisplay.textContent = 'Humidity: ' + humidity[i] + '%';
    days[i].appendChild(humidityDisplay)

    windDisplay = document.createElement('p');
    windDisplay.textContent = 'Wind Speed: '+ wind[i] + 'mph';
    days[i].appendChild(windDisplay)
  }



}