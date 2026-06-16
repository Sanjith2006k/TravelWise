import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API from "../services/weatherApi";

import AnimatedSection from "../components/AnimatedSection/AnimatedSection";
import Attractions from "../components/Attractions/Attractions";
import Hotels from "../components/Hotels/Hotels";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import CityDescription from "../components/CityDescription/CityDescription";
import WeatherCard from "../components/WeatherCard/WeatherCard";
import ForecastCard from "../components/ForecastCard/ForecastCard";
import Loader from "../components/Loader/Loader";

import { getWeatherTheme } from "../utils/weatherTheme";

function Explore() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");

  const [weather, setWeather] = useState(null);
  const [cityImages, setCityImages] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [hotels, setHotels] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const normalizedSearchCity = city?.trim().toLowerCase();
  const showEasterEgg =
    normalizedSearchCity === "tirunelveli" ||
    normalizedSearchCity === "tirunveli";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // =========================
        // WEATHER (Required)
        // =========================
        const weatherResponse = await API.get(
          `/weather/search?location=${city}`,
        );

        setWeather(weatherResponse.data);

        const { lat, lon, name, country } = weatherResponse.data.location;

        // =========================
        // ATTRACTIONS
        // =========================
        try {
          const attractionResponse = await API.get(
            `/attractions?lat=${lat}&lon=${lon}&city=${name}&country=${country}`,
          );

          setAttractions(attractionResponse.data);
        } catch (error) {
          console.log("Attractions fetch failed:", error);
        }

        // =========================
        // HOTELS
        // =========================
        try {
          const hotelResponse = await API.get(
            `/hotels?lat=${lat}&lon=${lon}&city=${name}&country=${country}`,
          );

          setHotels(hotelResponse.data);
        } catch (error) {
          console.log("Hotels fetch failed:", error);
        }

        // =========================
        // CITY IMAGES
        // =========================
        try {
          const imageResponse = await API.get(`/image?city=${city}`);

          if (Array.isArray(imageResponse.data)) {
            setCityImages(imageResponse.data);
          }
        } catch (error) {
          console.log("Image fetch failed:", error);
        }

        // =========================
        // CITY DESCRIPTION
        // =========================
        try {
          const wikiResponse = await API.get(`/wiki?city=${city}`);

          setCityInfo(wikiResponse.data);
        } catch (error) {
          console.log("Wiki fetch failed:", error);
        }
      } catch (error) {
        console.error(error);
        setError("Unable to fetch weather information.");
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchData();
    }
  }, [city]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-xl">{error}</h2>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-xl">No weather data found.</h2>
      </div>
    );
  }

  const bgClass = getWeatherTheme(weather.current.condition.text);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgClass} text-white`}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero Slider */}
        {cityImages.length > 0 && (
          <HeroSlider images={cityImages} weather={weather} />
        )}

        {/* City Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold">
            {weather.location.name}
          </h1>

          <p className="text-lg text-gray-300 mt-2">
            {weather.location.region}, {weather.location.country}
          </p>

          <p className="mt-4 text-gray-300">
            Local Time: {weather.location.localtime}
          </p>

          <CityDescription
            cityData={
              cityInfo || {
                title: weather.location.name,
                extract: `Discover ${weather.location.name}, ${weather.location.country} with live weather, forecast details, nearby hotels, attractions, destination images, and travel insights collected for your trip.`,
              }
            }
          />
        </div>

        {showEasterEgg && (
          <div className="mb-10 flex justify-center">
            <button
              onClick={() => {
                const audio = document.getElementById("tirunelveli-audio");

                audio.currentTime = 0;
                audio.play();
              }}
              className="animate-bounce rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-black shadow-xl transition-all hover:scale-110"
            >
              yelaii !!!
            </button>
          </div>
        )}

        {/* Attractions */}
        {attractions.length > 0 && (
          <AnimatedSection>
            <div className="mb-24">
              <Attractions attractions={attractions} />
            </div>
          </AnimatedSection>
        )}

        {/* Hotels */}
        {hotels.length > 0 && (
          <AnimatedSection>
            <div className="mb-24">
              <Hotels hotels={hotels} city={weather.location.name} />
            </div>
          </AnimatedSection>
        )}

        {/* Weather */}
        <AnimatedSection>
          <div className="mb-24">
            <WeatherCard weather={weather} />
          </div>
        </AnimatedSection>

        {/* Forecast */}
        <AnimatedSection>
          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-6">7-Day Forecast</h2>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
              {weather.forecast.forecastday.map((day) => (
                <ForecastCard key={day.date} day={day} />
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
      <audio id="tirunelveli-audio">
        <source src="/easter_egg.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Explore;
