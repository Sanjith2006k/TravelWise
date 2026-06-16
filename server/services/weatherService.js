const axios = require("axios");

const getWeatherData = async (location) => {
  const response = await axios.get(
    "https://api.weatherapi.com/v1/forecast.json",
    {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: location,
        days: 7,
        aqi: "yes",
      },
    },
  );

  return response.data;
};

module.exports = {
  getWeatherData,
};
