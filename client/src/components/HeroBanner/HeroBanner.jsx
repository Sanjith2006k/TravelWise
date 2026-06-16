function HeroBanner({ image, weather }) {
  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden">
      <img
        src={image}
        alt={weather.location.name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-10 left-10">
        <h1 className="text-6xl font-bold">{weather.location.name}</h1>

        <p className="text-xl">{weather.location.country}</p>

        <p className="text-2xl mt-3">{weather.current.temp_c}°C</p>
      </div>
    </div>
  );
}

export default HeroBanner;
