import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { incrementSearchCount } from "../store/authSlice";
import { searchPlanets } from "../services/api";
import { RootState } from "../store/store";
import { Planet } from "../types";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const { user, searchCount } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (searchQuery: string) => {
    if (!user) return;

    // Luke Skywalker check (15 searches per minute limit)
    if (user.name !== "Luke Skywalker" && searchCount >= 15) {
      alert("Search limit reached!");
      return;
    }

    try {
      const results = await searchPlanets(searchQuery);
      setPlanets(results);
      dispatch(incrementSearchCount());
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        handleSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const calculateSize = (population: string): string => {
    if (population === "unknown") return "text-base";
    const pop = parseInt(population);
    if (pop > 1000000000) return "text-4xl";
    if (pop > 100000000) return "text-3xl";
    if (pop > 10000000) return "text-2xl";
    if (pop > 1000000) return "text-xl";
    return "text-base";
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B0F] bg-[url('/star-wars-app/images/stars-bg.svg')] bg-fixed bg-cover text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-stars animate-twinkle"></div>
      <div className="absolute inset-0 bg-comets"></div>
      <div className="absolute inset-0 bg-space-dust"></div>

      {/* Floating Death Star */}
      <div className="fixed -right-32 top-20 opacity-10 w-96 h-96 animate-float">
        <img
          src="/star-wars-app/images/death-star.svg"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-6">
              <img
                src="/star-wars-app/images/rebel-alliance.svg"
                alt="Rebel Alliance"
                className="w-12 h-12 animate-pulse-slow"
              />
              <div>
                <h1 className="text-5xl font-starwars text-yellow-400 mb-2 tracking-wider animate-glow">
                  Galactic Database
                </h1>
                <p className="text-gray-400 text-xl">Welcome, {user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              {/* Search Count Display for non-Luke users */}
              {user?.name !== "Luke Skywalker" && (
                <div className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg border border-yellow-500/20">
                  <div className="text-sm text-gray-400 mb-1">
                    Search Balance
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-yellow-400">
                      {15 - searchCount}
                    </div>
                    <div className="text-sm text-gray-400">remaining</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-red-600/80 backdrop-blur-sm rounded-lg hover:bg-red-700/80 transition-all flex items-center space-x-2 group border border-red-500/20"
              >
                <span>Return to Base</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Search Section with enhanced effects */}
          <div className="relative mb-16 group">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-32 h-2 bg-blue-500/50 animate-pulse-slow rounded-full group-hover:w-40 transition-all"></div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-2 bg-red-500/50 animate-pulse-slow rounded-full group-hover:w-40 transition-all"></div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search planets in the galaxy..."
              className="w-full p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-yellow-500/20 text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-xl"
            />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Grid of Planets with enhanced animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planets.map((planet) => (
              <div
                key={planet.name}
                onClick={() => setSelectedPlanet(planet)}
                className="cursor-pointer p-8 bg-black/30 backdrop-blur-sm rounded-2xl
                  border border-yellow-500/20 hover:border-yellow-500/40
                  transition-all transform hover:-translate-y-2 hover:scale-105
                  hover:shadow-lg hover:shadow-yellow-500/10 group relative overflow-hidden"
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

                {/* Content */}
                <h3
                  className={`font-starwars ${calculateSize(
                    planet.population
                  )} text-yellow-400 mb-4 group-hover:animate-glow`}
                >
                  {planet.name}
                </h3>
                <div className="space-y-2 text-gray-400">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                    Climate: {planet.climate}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                    Terrain: {planet.terrain}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                    Population: {planet.population}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Planet Modal */}
      {selectedPlanet && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 p-12 rounded-3xl max-w-2xl w-full border border-yellow-500/20 transform animate-scale-up relative">
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h2 className="text-5xl font-starwars text-yellow-400 mb-8 text-center animate-glow">
              {selectedPlanet.name}
            </h2>

            <div className="grid grid-cols-2 gap-8 text-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Climate</label>
                  <p className="text-white text-xl">{selectedPlanet.climate}</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Terrain</label>
                  <p className="text-white text-xl">{selectedPlanet.terrain}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Population</label>
                  <p className="text-white text-xl">
                    {selectedPlanet.population}
                  </p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">
                    Rotation Period
                  </label>
                  <p className="text-white text-xl">
                    {selectedPlanet.rotation_period}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
