export const getWeatherTheme = (condition) => {
  const text = condition.toLowerCase();

  if (text.includes("sun")) {
    return "from-amber-900 via-stone-900 to-black";
  }

  if (text.includes("rain")) {
    return "from-blue-800 via-blue-900 to-black";
  }

  if (text.includes("cloud")) {
    return "from-slate-600 via-slate-800 to-black";
  }

  return "from-cyan-800 to-black";
};
