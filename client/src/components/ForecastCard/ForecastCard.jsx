function ForecastCard({ day }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
      <p>{day.date}</p>

      <img src={day.day.condition.icon} alt="" />

      <p>{day.day.avgtemp_c}°C</p>
    </div>
  );
}

export default ForecastCard;
