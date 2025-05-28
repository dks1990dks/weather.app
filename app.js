const apiKey = `bb4ce775f5d33ceaffc36b3e1de4232f`
const inputBox = document.getElementById(`city`)
const searchBtn = document.getElementById(`btn`)

async function GetWeatherData(city) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const data = await response.json()
    if(!response.ok){ 
        throw new Error("City Not Found");
    }else{
        document.querySelector(`.error-msg`).remove()
    }
    
    
    console.log(data);
    const iconCode = data.weather[0].icon
    console.log(iconCode);
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    document.getElementById(`weather-icon`).src = iconUrl;
    document.querySelector(`.weather-type`).innerHTML = `${data.weather[0].main} (${data.weather[0].description})`  ;
    
    document.querySelector(`.city`).innerHTML = data.name;
    document.querySelector(`.temperature`).innerHTML = `${Math.round(data.main.temp)}°c`;
    document.querySelector(`.humidity`).innerHTML = `${data.main.humidity}%`;
    document.querySelector(`.wind`).innerHTML = `${Math.round(data.wind.speed)} KM/H`;

    const sunriseTime = new Date(data.sys.sunrise*1000)
    const sunsetTime = new Date(data.sys.sunset*1000)
    console.log(sunriseTime,sunsetTime);
    const sunrise = sunriseTime.toLocaleTimeString([],{hour :`2-digit`,minute: `2-digit` })
    const sunset = sunsetTime.toLocaleTimeString([],{hour:`2-digit`,minute:`2-digit`})
    document.querySelector(`.sunrise`).innerHTML = `Sunrise : ${sunrise }`
    document.querySelector(`.sunset`).innerHTML = `Sunset : ${sunset }`

    const maxTemp = Math.round(data.main.temp_max) 
    const minTemp = Math.round(data.main.temp_min)
    console.log(maxTemp,minTemp);
    
    const res2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,alerts&appid={apiKey}&units=metric
`)
const data2 =await res2.json()
console.log(data2);

    
    
    
   document.querySelector(`.weather`).style.display = `block`    
    } catch (error) {
        console.error(error);
        let p = document.createElement(`p`)
        p.classList.add(`error-msg`)
        p.innerHTML = error.message

        const olderr = document.querySelector(`.card p.error-msg`)
        if(olderr) olderr.remove()

        

        document.querySelector(`.card`).append(p)        
    }
     
}

async function GetrainProbablity() {
    
}

searchBtn.addEventListener("click",()=>{
    const city = inputBox.value
    GetWeatherData(city)
})