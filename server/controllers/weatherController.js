const { getWeatherData } = require("../services/weatherService");

const searchWeather = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        message: "Location required",
      });
    }

    const data = await getWeatherData(location);

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  searchWeather,
};
