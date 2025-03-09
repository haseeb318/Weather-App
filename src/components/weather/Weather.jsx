import React, { useEffect, useState } from "react";
import Search from "../search/Search";
import "./weather.css";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async (city) => {
    if (!city) return;
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e4ccd68ca74efd701879b02d12bd5d7c&units=imperial`
      );
      
      if (!response.ok) {
        throw new Error("City not found");
      }
      
      const result = await response.json();
      setWeatherData(result);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("Islamabad");
  }, []);

  const handleSearch = () => {
    fetchData(search);
  };

  return (
    <div className="main-cont">

      <Search setSearch={setSearch} handleSearch={handleSearch} />
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {weatherData && (
        <div className="weather-info">
          <h1>
            {weatherData.name} {weatherData.sys && <span>({weatherData.sys.country})</span>}
          </h1>
          <p>Temp: {weatherData.main?.temp} °F</p>
          <p>{weatherData.weather?.[0]?.description}</p>
        </div>
      )}

    </div>
  );
};

export default Weather;
