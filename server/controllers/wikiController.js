const { getCityDescription } = require("../services/wikiService");

const fetchDescription = async (req, res) => {
  try {
    const { city } = req.query;

    const data = await getCityDescription(city);

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  fetchDescription,
};
