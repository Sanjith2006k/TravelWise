import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiClock, FiMapPin, FiSearch, FiX } from "react-icons/fi";

import API from "../../services/weatherApi";

const HISTORY_KEY = "travelwise-search-history";
const MAX_HISTORY_ITEMS = 8;

const POPULAR_CITY_SUGGESTIONS = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Dubai",
  "Singapore",
  "Sydney",
  "Rome",
  "Barcelona",
  "Istanbul",
  "Bangkok",
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Jaipur",
  "Goa",
  "Kerala",
  "San Francisco",
  "Toronto",
  "Amsterdam",
];

const normalizeCity = (value) => value.trim().replace(/\s+/g, " ");

const readHistory = () => {
  try {
    const storedHistory = JSON.parse(localStorage.getItem(HISTORY_KEY));

    return Array.isArray(storedHistory) ? storedHistory : [];
  } catch {
    return [];
  }
};

function SearchBar() {
  const [city, setCity] = useState("");
  const [history, setHistory] = useState(readHistory);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [cityPreview, setCityPreview] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const normalizedPreviewCity = normalizeCity(city);
  const shouldShowPreview =
    normalizedPreviewCity.length >= 3 && (previewLoading || cityPreview);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const closeSuggestions = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSuggestions);

    return () => document.removeEventListener("mousedown", closeSuggestions);
  }, []);

  useEffect(() => {
    const normalizedCity = normalizeCity(city);

    if (normalizedCity.length < 3) {
      return;
    }

    let isActive = true;

    const previewTimer = setTimeout(async () => {
      try {
        setPreviewLoading(true);

        const [imageResponse, wikiResponse] = await Promise.allSettled([
          API.get(`/image?city=${encodeURIComponent(normalizedCity)}`),
          API.get(`/wiki?city=${encodeURIComponent(normalizedCity)}`),
        ]);

        if (!isActive) return;

        const images =
          imageResponse.status === "fulfilled" &&
          Array.isArray(imageResponse.value.data)
            ? imageResponse.value.data
            : [];
        const description =
          wikiResponse.status === "fulfilled" ? wikiResponse.value.data : null;

        setCityPreview({
          title: description?.title || normalizedCity,
          image: images[0] || "",
          extract: description?.extract || "",
        });
      } catch {
        if (isActive) {
          setCityPreview(null);
        }
      } finally {
        if (isActive) {
          setPreviewLoading(false);
        }
      }
    }, 650);

    return () => {
      isActive = false;
      clearTimeout(previewTimer);
    };
  }, [city]);

  const filteredSuggestions = useMemo(() => {
    const normalizedCity = city.trim().toLowerCase();
    const combinedSuggestions = [...history, ...POPULAR_CITY_SUGGESTIONS];
    const uniqueSuggestions = [...new Set(combinedSuggestions)];

    if (!normalizedCity) {
      return uniqueSuggestions.slice(0, 6);
    }

    return uniqueSuggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(normalizedCity))
      .slice(0, 6);
  }, [city, history]);

  const saveSearch = (nextCity) => {
    const normalizedCity = normalizeCity(nextCity);
    const nextHistory = [
      normalizedCity,
      ...history.filter(
        (item) => item.toLowerCase() !== normalizedCity.toLowerCase(),
      ),
    ].slice(0, MAX_HISTORY_ITEMS);

    setHistory(nextHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  };

  const handleSearch = (nextCity = city) => {
    const normalizedCity = normalizeCity(nextCity);

    if (!normalizedCity) return;

    saveSearch(normalizedCity);
    setCity(normalizedCity);
    setIsSuggestionsOpen(false);
    navigate(`/explore?city=${encodeURIComponent(normalizedCity)}`);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return (
    <form
      ref={searchRef}
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
      className="relative max-w-2xl mx-auto"
    >
      <div className="flex gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />

          <input
            type="text"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setIsSuggestionsOpen(true);
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            placeholder="Search any city..."
            autoComplete="off"
            className="w-full p-4 pl-12 rounded-xl bg-white/10 border border-white/10 outline-none transition focus:border-cyan-300"
          />
        </div>

        <button
          type="submit"
          className="px-6 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition"
        >
          Search
        </button>
      </div>

      {isSuggestionsOpen && filteredSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-3 overflow-hidden rounded-xl border border-white/10 bg-zinc-950/95 text-left shadow-2xl backdrop-blur">
          {history.length > 0 && (
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-white/50">
                Recent searches
              </span>

              <button
                type="button"
                onClick={clearHistory}
                className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"
              >
                <FiX />
                Clear
              </button>
            </div>
          )}

          <div className="py-2">
            {filteredSuggestions.map((suggestion) => {
              const isRecent = history.some(
                (item) => item.toLowerCase() === suggestion.toLowerCase(),
              );

              return (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSearch(suggestion)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-white transition hover:bg-white/10"
                >
                  {isRecent ? (
                    <FiClock className="text-cyan-300" />
                  ) : (
                    <FiMapPin className="text-white/50" />
                  )}

                  <span>{suggestion}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {shouldShowPreview && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-left backdrop-blur-xl">
          {previewLoading && !cityPreview ? (
            <div className="p-5 text-sm text-white/70">Finding city details...</div>
          ) : (
            <div className="grid gap-0 md:grid-cols-[220px_1fr]">
              {cityPreview.image ? (
                <img
                  src={cityPreview.image}
                  alt={cityPreview.title}
                  className="h-48 w-full object-cover md:h-full"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-cyan-500/20 text-cyan-100 md:h-full">
                  <FiMapPin size={34} />
                </div>
              )}

              <div className="p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">
                  City preview
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {cityPreview.title}
                </h2>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-white/75">
                  {cityPreview.extract ||
                    "Search this destination to see weather, hotels, attractions, images, and travel details."}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </form>
  );
}

export default SearchBar;
