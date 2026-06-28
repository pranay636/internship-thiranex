const apiKey = "8ee64055a63d7d74eeacd19516de9f6d";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {

    loading.style.display = "block";
    weatherCard.style.display = "none";
    errorMessage.style.display = "none";

    try {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();

        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherCard.style.display = "block";

    } catch (error) {

        errorMessage.textContent = error.message;
        errorMessage.style.display = "block";

    } finally {

        loading.style.display = "none";

    }
}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = "block";
        weatherCard.style.display = "none";
        return;
    }

    getWeather(city);

});

cityInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});

