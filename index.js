const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const inputEl = document.getElementById("input");
let searchedCity = document.querySelector('.container .heading span');
const error404 = document.querySelector('.not-found');


function fetchWeatherInfo() {

    

const APIKey = "478e55b298ec9fb4114f0f767dd9a69d";
const city = document.querySelector('.search-box input').value;

if (city === '')
    return;

fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
.then(response => response.json())
.then(json => {
    
    if(json.cod === '404'){
        container.style.height = '490px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
    }

    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');
    const searchedCity = document.querySelector('.container .heading span');


    /*
    switch(json.weather[0].main){
        case 'Clear':
            image.src = 'https://openweathermap.org/img/wn/01d@4x.png'
            break;
        case 'Rain':
            image.src = 'https://openweathermap.org/img/wn/10d@4x.png'
            break;
        case 'Snow':
            image.src = 'https://openweathermap.org/img/wn/13d@4x.png'
            break;
        case 'Clouds':
            image.src = 'https://openweathermap.org/img/wn/03d@4x.png'
            break;
        case 'Haze':
            image.src = 'https://openweathermap.org/img/wn/50d@4x.png'
            break;

        default:
            image.src = '';
    }
    */


    image.src = `https://openweathermap.org/img/wn/${json.weather[0].icon}@4x.png`

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}<span>Km/h</span>`;

    searchedCity.innerHTML = ` : ${json.name}/${json.sys.country}`

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    searchedCity.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '510px';


})

}


search.addEventListener('click', ()=>{
    let searchedCity = document.querySelector('.container .heading span');

    fetchWeatherInfo();

})


inputEl.addEventListener("keyup", (e)=>{
    let searchedCity = document.querySelector('.container .heading span');
    console.log("keyuppia: ", e.key + " " + e.target.value);

        if (e.target.value && e.key === "Enter"){

            fetchWeatherInfo();
        }
})


/* Header */
const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function(){

    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
}

window.onscroll = function() {stickyHeader()};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function stickyHeader() {
  if (window.scrollY >= sticky) {
    header.classList.add("sticky")
  } else {
    header.classList.remove("sticky");
  }
}






