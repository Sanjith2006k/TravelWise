const express = require("express");
const cors = require("cors");
require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");
const countryRoutes = require("./routes/countryRoutes");
const imageRoutes = require("./routes/imageRoutes");
const wikiRoutes = require("./routes/wikiRoutes");
const attractionRoutes = require("./routes/attractionRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/hotels", hotelRoutes);

app.use("/api/weather", weatherRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/wiki", wikiRoutes);
app.use("/api/attractions", attractionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "TravelWise API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
