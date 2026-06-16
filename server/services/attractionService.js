const axios = require("axios");

const getAttractions = async (lat, lon) => {
  const response = await axios.get("https://api.geoapify.com/v2/places", {
    params: {
      categories: "tourism.sights,tourism.attraction",
      filter: `circle:${lon},${lat},10000`,
      limit: 10,
      apiKey: process.env.GEOAPIFY_API_KEY,
    },
  });

  return response.data.features;
};

module.exports = {
  getAttractions,
};
