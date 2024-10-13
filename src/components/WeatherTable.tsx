import { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; 
import "flexmonster/flexmonster.css";

export default function WeatherTable() {
  interface WeatherData {
    forecast: {
      forecastday: Array<{
        date: string;
        day: {
          condition: {
            text: string;
          };
          maxtemp_c: number;
          mintemp_c: number;
          maxwind_kph: number;
          avghumidity: number;
          uv: number;
        };
      }>;
    };
  }

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [daysCount, setDaysCount] = useState(5);
  const [location, setLocation] = useState('Kyiv'); 
  const [loading, setLoading] = useState(true);
  const authToken = Cookies.get('authToken'); 
  function getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation(`${lat},${lon}`); 
        },
        (error) => {
          console.error('Error getting location, defaulting to Kyiv:', error);
          setLoading(false); 
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser, defaulting to Kyiv.');
      setLoading(false); 
    }
  }

  useEffect(() => {
 
    if (authToken) {
        getPosition();
    }
  }, []);

  useEffect(() => {
    
    getWeatherInfo();
  }, [location, daysCount]);


  function getWeatherInfo() {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=c680e7b486db4415a85165138241210&q=${location}&days=${daysCount}&aqi=no&alerts=no`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  const handleSeeMoreClick = () => {
    setShowMore(!showMore);
  };

  const handleLoadMoreDays = () => {
    setDaysCount(daysCount + 3);
  };

  return (
    <>
      <div className="max-w-full min-h-screen mx-auto p-6 bg-blue-50 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Weather Forecast For {location}</h1>

        {loading ? (
          <p className="text-gray-500">Loading weather data...</p>
        ) : weatherData ? (
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
            
                    {showMore && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Humidity: {day.day.avghumidity}%</p>
                        <p>UV Index: {day.day.uv}</p>
                      </div>
                    )}
                  
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
          <p className="text-gray-500">Unable to fetch weather data. Please try again.</p>
        )}
      </div>
    </>
  );
}
