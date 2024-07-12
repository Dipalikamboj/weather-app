const weatherApi = {
    key: "828cc99e0335c9476a8f751b7c386d9a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};

const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const searchInputBox = document.getElementById('input-box');
const searchButton = document.getElementById('button');

// window.addEventListener('load', () => {
//     getWeatherReport('Radaur');
// });

searchInputBox.addEventListener('keypress', (event) => {
    if (event.code === 13) {
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

searchButton.addEventListener("click", () => {
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
});

async function getWeatherReport(city) {
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error while getting the weather report');
        }
        showWeatherReport(data);
    } catch (err) {
        console.error(err);
        showErrorMessage();
    }
}

function showErrorMessage() {
    document.getElementById('city').innerText = 'Country/City Name Not Found';
    document.getElementById('date').innerText = '';
    document.getElementById('temp').innerText = '';
    document.getElementById('min-max').innerText = '';
    document.getElementById('weather').innerText = '';
}

function showWeatherImage(weatherDescription) {
    const weatherImages = {
        'Clear': 'Clear1.jpg',
        'Clouds': 'clouds.jpg',
        'Haze': 'clouds.jpg',
        'Rain': 'rain.jpg',
        'Snow': 'snow.jpg',
        'Thunderstorm': 'thunder.jpg',
        'Sunny': 'sunny.jpg'
    };
    const imageUrl = weatherImages[weatherDescription];
    if (imageUrl) {
        document.body.style.backgroundImage = `url('https://github.com/swapnilsparsh/30DaysOfJavaScript/blob/master/25%20-%20Weather%20App/${imageUrl}?raw=true')`;
    }
}

function showWeatherReport(weather) {
    document.getElementById('city').innerText = `${weather.name}, ${weather.sys.country}`;
    document.getElementById('temp').innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    document.getElementById('min-max').innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
    document.getElementById('weather').innerText = weather.weather[0].main;
    document.getElementById('humidity').innerText = `${weather.main.humidity}%`;
    document.getElementById('wind').innerText = `${weather.wind.speed} kmph`;
    document.getElementById('pressure').innerText = `${weather.main.pressure} hPa`;
    document.getElementById('date').innerText = dateManage(new Date());
    showWeatherImage(weather.weather[0].main);
}

function dateManage(dateArg) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = dateArg.getFullYear();
    const month = months[dateArg.getMonth()];
    const date = dateArg.getDate();
    const day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

const icons = [
    { id: "himg", src: "icons8-humidity-64.png" },
    { id: "wimg", src: "icons8-wind-64.png" },
    { id: "pimg", src: "gauge%20(1).png" }
];

icons.forEach(icon => {
    const img = document.createElement("img");
    img.src = `https://github.com/swapnilsparsh/30DaysOfJavaScript/blob/master/25%20-%20Weather%20App/${icon.src}?raw=true`;
    document.getElementById(icon.id).appendChild(img);
});