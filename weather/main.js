const cityInput= document.querySelector(".cityinput");
const submit  = document.querySelector(".submitbtn");
const weatherForm = document.querySelector(".formcontainer");
const card = document.querySelector(".container");
apikey  = "11b436228e1ad519442a4fb1f31995b0"

weatherForm.addEventListener("submit" , async event =>{
    event.preventDefault();

    const city = cityInput.value;
    if (city){
        try{
            const weatherData = await getweatherData(city);
            displayweatherInfo(weatherData)
        }
        catch(error){
            console.error(error)
            displayError(error)
        }
    
    }
    else{
        displayError("Please enter a city");
    }
});

async function getweatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if (!response.ok){
        throw new Error("Could Not fetch data");
    }

    return await response.json();

}

function displayweatherInfo(data){
    const {name: city , main: {temp, humidity} , weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humidDisplay = document.createElement("p");
    const descDipslay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp).toFixed(1)}°C`;
    humidDisplay.textContent = `Humidity: ${humidity}%`;
    descDipslay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id);


    cityDisplay.classList.add("citycontainer");
    tempDisplay.classList.add("tempcontainer");
    humidDisplay.classList.add("humicontainer");
    descDipslay.classList.add("weathercontainer");
    weatherEmoji.classList.add("emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidDisplay);
    card.appendChild(descDipslay);
    card.appendChild(weatherEmoji);

}

function getweatherEmoji(weatherID){
    switch(true){
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️​";
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️​";
        case (weatherID >= 500 && weatherID < 600):
            return "☔";
        case (weatherID >= 600 && weatherID < 700):
            return "❄️​";
        case (weatherID >= 700 && weatherID < 800):
            return "🌁";
        case (weatherID === 800):
            return "🌞";    
        case (weatherID >= 801 && weatherID < 810):
            return "⛅​";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    

}









































