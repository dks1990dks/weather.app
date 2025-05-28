

const apiKey = `bb4ce775f5d33ceaffc36b3e1de4232f`
const inputBox = document.getElementById(`city`)
const searchBtn = document.getElementById(`btn`)




async function weatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        const data = await response.json()

        if (!response.ok) throw new Error("City not found");
        if (response.ok) {
            const errorMsg = document.querySelector(".error-msg");
            if (errorMsg) errorMsg.style.display = "none";
        }



        console.log(data);
        document.querySelector(".city").innerText = data.name;
        document.querySelector('.temperature').innerText = `${Math.round(data.main.temp / 10)}°c`;
        document.querySelector(`.humidity`).innerText = `${data.main.humidity}`
        document.querySelector(`.wind`).innerText = `${data.wind.speed} km/h`
        // Set weather icon image from API
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("weather-icon").src = iconUrl;


        document.querySelector(".weather").style.display = "block"
        const condition = data.weather[0].main;
        updateWeatherIcon(condition);

    } catch (error) {
        console.error(error);

        const p = document.createElement("p");
        p.classList.add("error-msg");
        p.innerText = error.message;

        const oldError = document.querySelector(".card p.error-msg");
        if (oldError) oldError.remove();

        document.querySelector(".card").append(p);
        document.querySelector(".weather").style.display = "none";

    }


}

function updateWeatherIcon(condition) {
    const icon = document.getElementById('weather-icon');

    switch (condition) {
        case 'Clear':

            icon.className = 'fa fa-sun-o wicon';
            icon.style.color = 'yellow';
            break;
        case 'Clouds':
            icon.className = 'fa fa-cloud wicon';
            icon.style.color = 'gray';
            break;
        case 'Rain':
            icon.className = 'fa fa-cloud-showers-heavy wicon';
            icon.style.color = 'blue';
            break;
        case 'Snow':
            icon.className = 'fa fa-snowflake-o wicon';
            icon.style.color = 'lightblue';
            break;
        case 'Thunderstorm':
            icon.className = 'fa fa-bolt wicon';
            icon.style.color = 'orange';
            break;
        case 'Drizzle':
            icon.className = 'fa fa-tint wicon';
            icon.style.color = 'lightblue';
            break;
        case 'Mist':
        case 'Fog':
        case 'Haze':

            icon.className = 'fa fa-smog wicon';
            icon.style.color = 'lightgray';
            break;
        default:
            icon.className = 'fa fa-question wicon';
            icon.style.color = 'black';
    }
}


searchBtn.addEventListener(`click`, () => {
    const city = inputBox.value

    weatherData(city)

})