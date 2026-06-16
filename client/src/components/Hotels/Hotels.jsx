import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";

import API from "../../services/weatherApi";

function Hotels({ hotels, city }) {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    if (!hotels.length) return;

    let isActive = true;

    const fetchHotelImages = async () => {
      const imageEntries = await Promise.all(
        hotels.map(async (hotel, index) => {
          const hotelName = hotel.properties.name;
          const imageQuery = encodeURIComponent(
            `${hotelName} ${city || ""} hotel exterior`,
          );

          try {
            const response = await API.get(`/image?query=${imageQuery}`);
            const image = Array.isArray(response.data) ? response.data[0] : "";

            return [index, image];
          } catch {
            return [index, ""];
          }
        }),
      );

      if (isActive) {
        setHotelImages(Object.fromEntries(imageEntries));
      }
    };

    fetchHotelImages();

    return () => {
      isActive = false;
    };
  }, [city, hotels]);

  return (
    <section className="mt-20">
      <h2 className="text-4xl font-bold mb-8">Recommended Hotels</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotels.map((hotel, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps?q=${hotel.geometry.coordinates[1]},${hotel.geometry.coordinates[0]}`}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/15"
          >
            {hotelImages[index] ? (
              <img
                src={hotelImages[index]}
                alt={hotel.properties.name}
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-44 items-center justify-center bg-cyan-500/20 text-cyan-100">
                <FiMapPin size={34} />
              </div>
            )}

            <div className="p-5">
              <h3 className="font-bold">{hotel.properties.name}</h3>

              <p className="text-gray-300 mt-3">{hotel.properties.formatted}</p>

              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200">
                <FiMapPin />
                View on map
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Hotels;
