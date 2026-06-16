const { searchImages } = require("../services/imageService");

const getCityImages = async (req, res) => {
  try {
    const { city, query } = req.query;

    const imageQuery = query || `${city} tourism travel`;
    const photos = await searchImages(imageQuery, 6);

    const images = photos.map((photo) => photo.src.large2x);

    res.json(images);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCityImages,
};
