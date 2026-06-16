const { getHotels } = require("../services/hotelService");

const fetchHotels = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const hotels = await getHotels(lat, lon);

    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  fetchHotels,
};
