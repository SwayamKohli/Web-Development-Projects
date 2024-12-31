const apiUrl = 'https://api.open-meteo.com/v1/forecast';
const getWeatherButton = document.getElementById('getWeatherButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');

async function fetchWeather(city) {
    // Replace with latitude and longitude based on the city
    const latitude = 28.6519; // Example latitude for New Delhi
    const longitude = 77.2315; // Example longitude for New Delhi

    try {
        const response = await fetch(`${apiUrl}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
        console.error(error);
    }
}

function formatTime(isoTime) {
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function displayWeather(data) {
    const temperatures = data.hourly.temperature_2m;
    const times = data.hourly.time;

    weatherInfo.innerHTML = '<h2>Hourly Temperatures</h2>';
    weatherInfo.innerHTML += `<div class="weather-info">`;

    times.forEach((time, index) => {
        const formattedTime = formatTime(time);
        weatherInfo.innerHTML += `
            <div class="weather-box">
                <p>${formattedTime}</p>
                <p>${temperatures[index]}°C</p>
            </div>
        `;
    });

    weatherInfo.innerHTML += `</div>`;
    weatherInfo.style.display = 'block';
    errorMessage.style.display = 'none';
}

getWeatherButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        errorMessage.style.display = 'block';
        weatherInfo.style.display = 'none';
    }
});