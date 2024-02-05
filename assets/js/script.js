let cityDisplay = document.getElementById('cityName');
let cityInput = document.getElementById('cityInput');
let day1 = document.getElementById('1');
let day2 = document.getElementById('2');
let day3 = document.getElementById('3');
let day4 = document.getElementById('4');
let day5 = document.getElementById('5');
let search = document.getElementById('search');
let dateDisplay = document.getElementById('date');
let date = dayjs().format('dddd, DD MMMM, YYYY');
let city;
let state;
let country;
var lat;
var lon;
var temp;
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
  cityState = cityInput.value.split(' ');
  city = cityState[0];
  state = cityState[1];

  if (cityState.length != 2 || state.length != 2 || city.endsWith(',') == false) {
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
  let geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + state + ',' + country + '&limit=5&appid=' + apiKey;
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

    let weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            temp = data.list.main.temp;
            console.log(data);
            console.log(temp)
            displayWeather();
        })
}

function displayWeather() {

  console.log('Temp' + data.list.main.temp)
  tempDisplay = document.createElement('p');

}