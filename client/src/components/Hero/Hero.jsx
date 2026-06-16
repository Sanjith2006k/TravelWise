import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-bold text-center"
      >
        Explore The World
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-gray-400 text-center"
      >
        Weather, Hotels, Attractions & Travel Insights
      </motion.p>

      <div className="mt-10 w-full">
        <SearchBar />
      </div>
    </section>
  );
}

export default Hero;
