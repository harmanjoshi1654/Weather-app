const apiKey="e254aac0a0c4a94fc46368f628251fbf"

const WeatherDataEle=document.querySelector(".weather-data")

const cityNameEle=document.querySelector("#city-name")

const formEle=document.querySelector("form")

const imgIcon=document.querySelector(".icon")

addEventListener("submit",(e)=>{
    e.preventDefault();
    const cityValue=cityNameEle.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        )
    
        if(!response.ok){
            throw new Error("Network response is not ok!")
        }

        const data=await response.json()
        console.log(data);

        const temp=Math.floor(data.main.temp)
        const desc=data.weather[0].description
        const icon=data.weather[0].icon

        const details=[
            `Feels Like:${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed:${data.wind.speed}m/s`
        ]
        WeatherDataEle.querySelector(".temp").textContent=`${temp}°C`
        WeatherDataEle.querySelector(".desc").textContent=`${desc}`

        imgIcon.innerHTML=`<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`
        
        WeatherDataEle.querySelector(".details").innerHTML=details.map(
            (detail)=>{
                return `<div>${detail}</div>`
            }
        ).join("")

    }
    catch(err){
       WeatherDataEle.querySelector(".temp").textContent=""
       imgIcon.innerHTML=""
        WeatherDataEle.querySelector(".desc").textContent="An Error Occured!"
        
        WeatherDataEle.querySelector(".details").innerHTML=""

    }

}