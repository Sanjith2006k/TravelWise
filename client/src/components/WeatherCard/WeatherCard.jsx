function WeatherCard({ weather }) {
  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold">{weather.current.temp_c}°C</h2>

          <p>{weather.current.condition.text}</p>
        </div>

        <img src={weather.current.condition.icon} alt="" />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <p>Humidity</p>
          <p>{weather.current.humidity}%</p>
        </div>

        <div>
          <p>Wind</p>
          <p>{weather.current.wind_kph} km/h</p>
        </div>

        <div>
          <p>UV</p>
          <p>{weather.current.uv}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
