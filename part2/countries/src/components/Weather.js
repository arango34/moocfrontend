import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital, latlng }) => {
  const [currentCapital, setCurrentCapital] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    if (capital === currentCapital || !latlng) return;

    const fetchWeather = async () => {
      const { data } = await axios(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${
          latlng[1]
        }&exclude=${['minutely', 'hourly', 'daily', 'alerts']}&appid=${
          process.env.REACT_APP_API_KEY
        }`
      );
      console.log('got weather data');
      console.log(data);
      setWeatherData(data);
      setCurrentCapital(capital);
    };

    try {
      fetchWeather();
    } catch (error) {
      console.log(error.message);
    }
  }, [capital, currentCapital, latlng]);

  return (
    <div>
      {weatherData && (
        <>
          <h2>Weather in {capital}</h2>
          <div>temperature </div>
        </>
      )}
    </div>
  );
};

export default Weather;
