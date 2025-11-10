import './styles.css';

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = process.env.API_KEY;;


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weather = await getWeatherData(city);
            displayWeatherInfo(weather);
        } 
        catch(error) {
            console.error(error);
            displayError(error.message);
        }
    } 
    else {
        displayError("Please enter a city");
    }
});


async function getWeatherData(city) {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;
    
    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}


function displayWeatherInfo(data){
    const {
    resolvedAddress: city,
    currentConditions: {
        temp,
        humidity,
        conditions,
        icon,
    }
    } = data;




    card.textContent = "";
    card.style.display = "flex";
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const conditionsDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");


    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    conditionsDisplay.textContent = conditions;
    emojiDisplay.textContent = getWeatherEmoji(icon);
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    conditionsDisplay.classList.add("conditionsDisplay");
    emojiDisplay.classList.add("emojiDisplay")

    
    
    
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(conditionsDisplay);
    card.appendChild(emojiDisplay);
    


}




function getWeatherEmoji(iconName) {
    const emojiMap = {
        "clear-day": "☀️",
        "clear-night": "🌕",
        "partly-cloudy-day": "⛅",
        "partly-cloudy-night": "🌤️",
        "cloudy": "☁️",
        "rain": "🌧️",
        "snow": "❄️",
        "fog": "🌫️",
        "wind": "💨",
        "hail": "🧊",
        "thunderstorm": "🌩️"
    };

    return emojiMap[iconName] || "";
}


function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;         
    errorDisplay.classList.add("displayError");   

    
    card.textContent = "";           
    card.style.display = "flex";  
    card.appendChild(errorDisplay);  
}

