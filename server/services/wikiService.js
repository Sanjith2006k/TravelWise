const axios = require("axios");

const getCityDescription = async (city) => {
  console.log("Searching Wikipedia for:", city);

  const response = await axios.get("https://en.wikipedia.org/w/api.php", {
    params: {
      action: "query",
      format: "json",
      prop: "extracts",
      exintro: true,
      explaintext: true,
      titles: city,
    },
  });

  console.log("Wikipedia response received");

  const pages = response.data.query.pages;
  const page = Object.values(pages)[0];

  return {
    title: page.title,
    extract: page.extract || `No description available for ${city}.`,
  };
};

module.exports = {
  getCityDescription,
};
