const axios = require("axios");

const getCountryInfo = async (country) => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${country}`,
  );

  return response.data[0];
};

module.exports = {
  getCountryInfo,
};
