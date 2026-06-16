function Attractions({ attractions }) {
  return (
    <section className="mt-16">
      <h2 className="text-4xl font-bold mb-8">Top Attractions</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {attractions.map((place, index) => (
          <a
            key={index}
            href={`https://www.google.com/maps?q=${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500"
          >
            <img
              src={
                place.image || `https://picsum.photos/800/500?random=${index}`
              }
              alt={place.properties.name}
              className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="p-6">
              <h3 className="text-xl font-bold">{place.properties.name}</h3>

              <p className="text-gray-300 mt-3">{place.properties.formatted}</p>

              <div className="mt-4 text-blue-300">View on Maps →</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Attractions;
