const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "a50a08eccb6e84639515bd8444069a86";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherCity(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Error fetching weather data.");
        }
    } else {
        displayError("Please enter a city.");
    }
});

async function getWeatherCity(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather data.");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    // Example of displaying weather info (fill this in as needed)
    const temp = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
    const description = data.weather[0].description;
    const weatherEmoji = getWeatherEmoji(data.weather[0].id);

    card.innerHTML = `
        <h2>${data.name}</h2>
        <p>${weatherEmoji} ${description}</p>
        <p>Temperature: ${temp}°C</p>
    `;
    card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
    // Map weatherId to appropriate emoji (simplified example)
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈️"; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 600) {
        return "🌧️"; // Rain or drizzle
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄️"; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫️"; // Atmosphere (fog, dust, etc.)
    } else if (weatherId === 800) {
        return "☀️"; // Clear
    } else if (weatherId > 800) {
        return "☁️"; // Clouds
    } else {
        return "🌡️"; // Default
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
