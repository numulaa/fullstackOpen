import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY;

const Weather = ({ country }) => {
  const [cityWeather, setCityWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
      )
      .then((res) => {
        console.log(res.data);
        setCityWeather(res.data);
      });
  }, []);

  return (
    <>
      <h3>Weather in {country.capital}</h3>
      {cityWeather !== null ? (
        <>
          <p>Temperature {cityWeather.main.temp} Fahrenheit</p>
          <img
            src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`}
          />
          <p>Wind {cityWeather.wind.speed}m/s</p>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Weather;
