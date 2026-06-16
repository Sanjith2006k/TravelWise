function TravelGuide({ city }) {
  return (
    <section className="mt-20 bg-white/10 backdrop-blur-xl rounded-3xl p-8">
      <h2 className="text-4xl font-bold mb-4">Travel Guide</h2>

      <p>
        Best time to visit {city} is generally during pleasant weather seasons.
        Explore local attractions, cuisine, culture, and nearby landmarks.
      </p>
    </section>
  );
}

export default TravelGuide;
