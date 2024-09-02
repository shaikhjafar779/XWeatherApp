import React, { useState } from 'react';
import axios from 'axios';

const XWeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeatherData = async () => {
        if (!city) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
                params: {
                    key: 'ff526cffa18d4a64927120043240209',
                    q: city
                }
            });
            setWeatherData(response.data);
        } catch (err) {
            alert('Failed to fetch weather data');
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };
    const weatherDetails = [
        { label: 'Temperature', value: `${weatherData?.current.temp_c}°C` },
        { label: 'Humidity', value: `${weatherData?.current.humidity}%` },
        { label: 'Condition', value: weatherData?.current.condition.text },
        { label: 'Wind Speed', value: `${weatherData?.current.wind_kph} km/h` }
    ];
    return (
        <div>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    style={{ marginTop: '50px' }}
                />
                <button onClick={fetchWeatherData}>Search</button>
            </div>

            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}

            {weatherData && !loading && (
                <div className="weather-cards">
                    <ul>
                        {weatherDetails.map((detail, index) => (
                            <li key={index} className="weather-card">
                                <h4>{detail.label}:</h4>
                                <p>{detail.value}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default XWeatherApp;