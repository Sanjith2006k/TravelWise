import { FiCloud, FiCompass, FiMapPin } from "react-icons/fi";

const highlights = [
  {
    icon: FiCloud,
    title: "Weather at a glance",
    text: "Check current conditions and a 7-day forecast before you plan your trip.",
  },
  {
    icon: FiMapPin,
    title: "Places that matter",
    text: "Find nearby attractions and hotels for the city you want to explore.",
  },
  {
    icon: FiCompass,
    title: "City context",
    text: "Preview destination images, local details, and quick travel insight in one place.",
  },
];

function HomeDescription() {
  return (
    <section className="bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            About TravelWise
          </p>
          <h2 className="mt-3 text-4xl font-bold">Plan smarter city trips</h2>
          <p className="mt-5 text-lg leading-8 text-gray-300">
            TravelWise helps you search any city and instantly understand what
            it is like to visit. You can explore live weather, forecasts,
            destination photos, hotels, attractions, and city information from a
            single simple search.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <Icon className="text-cyan-300" size={28} />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-gray-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeDescription;
