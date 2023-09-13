'use strict'
const aPIKey = 'd3902468b7ebf26f89b687b6b174aeee';
const aPIUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const aPIUnit = '&units=metric';
const weatherImg = document.querySelector('.weather-status img');
const searchInput = document.querySelector('.search input');
const searchButton = document.getElementById('search-button');

const checkWeather = async function(city) {
  try {
    const response = await fetch(`${aPIUrl}q=${city}&appid=${aPIKey}${aPIUnit}`);
    const data = await response.json();
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + ' °C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
    const src = data.weather[0].main.toLowerCase();
    weatherImg.src = `images/${src}.png`;
    document.querySelector('.weather-status').style.display = 'block';
    
  } catch (err){
    document.querySelector('.weather-status').style.display = 'none';
    alert('Invalid city name! Please try again!');
    searchInput.value = ''
  }
 
}
searchButton.addEventListener('click', () => {
  checkWeather(searchInput.value)});
document.addEventListener('keydown', function(x){
  if(x.key === "Enter"){
    checkWeather(searchInput.value);
  }
})