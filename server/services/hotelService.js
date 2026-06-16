const axios = require("axios");

const getHotels = async (lat, lon) => {
  const response = await axios.get("https://api.geoapify.com/v2/places", {
    params: {
      categories: "accommodation.hotel",
      filter: `circle:${lon},${lat},10000`,
      limit: 8,
      apiKey: process.env.GEOAPIFY_API_KEY,
    },
  });

  return response.data.features;
};

module.exports = {
  getHotels,
};
