import { useEffect,useState } from "react"
import axios from "axios"


const Weather = ({capital,lon,lat})=>{
const [current,setCurrent] =useState({})
console.log(capital)
    useEffect(()=>{
        axios
        .get( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=97fb82eb5bb6bea79abe3766b85142b8`).then(response => {
          console.log('promise fulfilled')
          
          setCurrent(response.data)
          
          
          console.log(response.data)
        })
          
    
      },[])
    return(
        <>
        <h3>Weather in {capital}</h3>
        <p>temperature {current.main.temp-273.15} celsius</p>
        <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}/>
        <p>wind  {current.wind.speed}m/s</p>
        </>
    )
}

export default Weather