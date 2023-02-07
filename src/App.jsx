import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {

const [coords, setCoords] = useState()
const [weather, setWeather] = useState()
const [temperature, setTemperature] = useState()
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  
  const success = pos => {
  const obj = {
    lat: pos.coords.latitude,
    lon: pos.coords.longitude
  }

    setCoords(obj);
  }


  navigator.geolocation.getCurrentPosition(success)
}, [] )
 
useEffect(() => {
  if(coords){
    const APIKey = '6a0f81ff6f065e0660921503ecf198ce'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`

    axios.get(url)
      .then(res => {
        setWeather(res.data)
        const obj = {
          celcius: (res.data.main.temp - 273.15).toFixed(1),
          farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
        setTemperature(obj)
        })
        
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }
}, [coords])


  return (
    <div className="App">
      { 
      isLoading ? 
        <img src="/Spin-1.6s-200px.svg" alt="pantalla de carga" className='loading'/> 
      :
        <WeatherCard 
        weather={weather}
        temperature={temperature} 
        />
      }
      
    </div>
  )
}

export default App
