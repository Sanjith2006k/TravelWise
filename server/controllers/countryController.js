const { getCountryInfo } = require("../services/countryService");

const fetchCountry = async (req, res) => {
  try {
    const { country } = req.query;

    console.log("Country requested:", country);

    const data = await getCountryInfo(country);

    console.log("Data received");

    res.json(data);
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  fetchCountry,
};
