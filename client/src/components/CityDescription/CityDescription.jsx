import { motion } from "framer-motion";

function CityDescription({ cityData }) {
  const title = cityData?.title || "this city";
  const extract =
    cityData?.extract ||
    `Explore ${title} with TravelWise to see weather, forecasts, attractions, hotels, destination photos, and useful travel details in one place.`;

  return (
    <motion.section
      className="mt-12 rounded-3xl border border-white/10 bg-black/25 p-8 backdrop-blur-xl"
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
        City overview
      </p>
      <h2 className="mt-3 text-4xl font-bold">About {title}</h2>

      <p className="mt-6 text-lg leading-8 text-gray-200">{extract}</p>
    </motion.section>
  );
}

export default CityDescription;
