const axios = require("axios");

const searchImages = async (query, count = 6) => {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query,
        per_page: count,
      },
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    return response.data.photos || [];
  } catch (error) {
    console.error("Pexels Error:", error.message);
    return [];
  }
};

module.exports = {
  searchImages,
};
