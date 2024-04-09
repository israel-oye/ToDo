const APIKey = 'c80426018c4fe795efbe7edce9eca791';

const getGeoCode = async (cityName) => {
    let endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},NG&limit=1&appid=${APIKey}`;
    let response = await fetch(endpoint);
    let data = await response.json();
    data = data[0];
    return { lat: data['lat'], lon: data['lon'] }
};

const getWeatherdetails = async (cityName) => {
    getGeoCode(cityName)
        .then(data => {
            let geoCode = data;
            return geoCode
        })
        .then(geoCode => {
            let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${geoCode.lat}&lon=${geoCode.lon}&appid=${APIKey}`;
            let response = fetch(endpoint);
            return response;
        })
        .then(response => {
            let data = response.json()
            return data;
        })
        .then(data => {
            displayDetails(data);
        })
        .catch(err => {
            console.error(err);
            document.getElementById('weather-descr').innerHTML = `Sorry, your city: ${cityName}'s data is not available`
        })

    // let geoCode = await getGeoCode(cityName);
    // let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${geoCode.lat}&lon=${geoCode.lon}&appid=${APIKey}`;
    // let response = await fetch(endpoint);
    // displayDetails(await response.json());
    // return response.json();
};


const fetchData = async () => {
    let userInput = document.getElementById('city-name').value;
    await getWeatherdetails(userInput);
};


const displayDetails = (dataObj) => {
    let displayText = `In ${dataObj.name}, there is/are ${dataObj.weather[0]['description']} <img src="https://openweathermap.org/img/wn/${dataObj.weather[0]['icon']}.png"> <br>
                        The temperature is about ${Math.trunc(dataObj.main['temp'] - 273.15)}°C but it feels like ${Math.trunc(dataObj.main['feels_like'] - 273.15)}°C.
                    `
    document.getElementById('weather-descr').innerHTML = displayText;
};


const disableButton = (buttonElement, state) => {
    if (state) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.innerHTML = `Searching <i class="fa-solid fa-spinner fa-spin"></i>`
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.innerHTML = `Check weather <i class="fa-solid fa-magnifying-glass"></i>`
    }
};


const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', function (e) {
    disableButton(this, true);
    fetchData()
        .then(() => {
            setTimeout(() => {
                disableButton(this, false);
            }, 1500);

        })

});