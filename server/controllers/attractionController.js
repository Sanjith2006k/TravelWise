const { getAttractions } = require("../services/attractionService");
const { searchImages } = require("../services/imageService");

const fetchAttractions = async (req, res) => {
  try {
    const { lat, lon, city, country } = req.query;

    const attractions = await getAttractions(lat, lon);

    const attractionsWithImages = await Promise.all(
      attractions.slice(0, 6).map(async (place) => {
        const photos = await searchImages(
          `${place.properties.name} landmark ${city} ${country}`,
          1,
        );

        return {
          ...place,
          image: photos[0]?.src?.large2x || null,
        };
      }),
    );

    res.json(attractionsWithImages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  fetchAttractions,
};
