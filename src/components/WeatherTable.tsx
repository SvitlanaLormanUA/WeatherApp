import React, { useState, useEffect } from 'react';
import "flexmonster/flexmonster.css";

export default function WeatherTable() {
  const [weatherData, setWeatherData] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [daysCount, setDaysCount] = useState(5); 

  useEffect(() => {
    getWeatherInfo();
  }, [daysCount]); 

  function getWeatherInfo() {
    const url =
      `http://api.weatherapi.com/v1/forecast.json?key=c680e7b486db4415a85165138241210&q=Kyiv&days=${daysCount}&aqi=no&alerts=no`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  const handleSeeMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleLoadMoreDays = () => {
    setDaysCount(daysCount + 3); // Load 3 more days
  };

  return (
    <>
      <div className="max-w-full min-h-screen mx-auto p-6 bg-blue-50 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">7-Day Weather Forecast for Kyiv</h1>

        {weatherData ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weatherData.forecast.forecastday.map((day, index) => {
              const weatherCondition = day.day.condition.text;
              const windSpeed = day.day.maxwind_kph;
              let weatherEmoji = '';
              let windEmoji = '';

              if (weatherCondition.includes('Sunny')) weatherEmoji = '☀️';
              else if (weatherCondition.includes('Cloudy')) weatherEmoji = '☁️';
              else if (weatherCondition.includes('rain')) weatherEmoji = '🌧️';
              else if (weatherCondition.includes('Snow')) weatherEmoji = '❄️';
              else if (weatherCondition.includes('Thunderstorm')) weatherEmoji = '⛈️';

              if (windSpeed < 20) windEmoji = '🌬️';
              else if (windSpeed < 50) windEmoji = '💨';
              else windEmoji = '🌪️';

              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : formatDate(day.date)}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-3xl">{weatherEmoji}</span>
                    <span>{day.day.condition.text}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-lg font-semibold">
                      {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xl">{windEmoji}</span>
                      <span>{windSpeed} km/h</span>
                    </div>
                    {/* Show more details */}
                    {showMore && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Humidity: {day.day.avghumidity}%</p>
                        <p>UV Index: {day.day.uv}</p>
                      </div>
                    )}
                    {/* Small "See More" button inside the card */}
                    <button
                      onClick={handleSeeMoreClick}
                      className="mt-2 px-3 py-1 text-xs text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded-full transition-all duration-300"
                    >
                      {showMore ? 'Show Less' : 'See More'}
                    </button>
                  </div>
                </div>
              );
            })}
            {/* Button for loading more days */}
            <div className="col-span-full mt-4 text-center">
              <button
                onClick={handleLoadMoreDays}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
              >
                Load More Days
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading weather data...</p>
        )}
      </div>
    </>
  );
}
