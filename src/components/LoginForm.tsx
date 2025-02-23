import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { searchCharacter } from "../services/api";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const characters = await searchCharacter(username);
      const character = characters.find(
        (c: any) => c.name === username && c.birth_year === password
      );

      if (character) {
        dispatch(login(character));
        navigate("/search");
      } else {
        setError(
          "Invalid credentials. Please check your Character Name and Birth Year."
        );
      }
    } catch (err) {
      setError("Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] bg-[url('/star-wars-app/images/stars-bg.svg')] bg-cover bg-fixed relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-stars animate-twinkle"></div>
      <div className="absolute inset-0 bg-comets"></div>

      {/* Floating planets */}
      <div className="absolute left-20 top-20 w-32 h-32 opacity-20 animate-float-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/30 to-red-500/30 blur-sm"></div>
      </div>
      <div className="absolute right-40 bottom-20 w-24 h-24 opacity-20 animate-float-delayed">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-sm"></div>
      </div>

      {/* Death Star */}
      <div className="absolute -right-32 top-0 opacity-20 w-96 h-96 animate-float">
        <img
          src="/star-wars-app/images/death-star.svg"
          alt=""
          className="w-full h-full"
        />
      </div>

      {/* Main container with enhanced glassmorphism */}
      <div className="max-w-md w-full space-y-8 p-10 bg-black/40 backdrop-blur-xl rounded-2xl border border-yellow-500/20 relative z-10 shadow-xl shadow-yellow-500/5">
        {/* Empire logo with animation */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 animate-spin-slow">
          <img
            src="/star-wars-app/images/empire-logo.svg"
            alt=""
            className="w-full h-full drop-shadow-2xl"
          />
        </div>

        <div className="text-center mt-12">
          <h1 className="text-5xl font-starwars text-yellow-400 mb-2 tracking-wider animate-glow">
            STAR WARS
          </h1>
          <h2 className="text-xl text-gray-400 tracking-[0.2em] font-thin">
            AUTHENTICATION PORTAL
          </h2>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-shake">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <label
                htmlFor="username"
                className="text-yellow-400/80 text-sm font-medium block mb-2 tracking-wider"
              >
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-yellow-500/20 bg-black/50 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent placeholder-gray-500 transition-all"
                placeholder="e.g. Luke Skywalker"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="absolute right-3 top-[38px] w-5 h-5 text-yellow-500/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="text-yellow-400/80 text-sm font-medium block mb-2 tracking-wider"
              >
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-yellow-500/20 bg-black/50 text-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent placeholder-gray-500 transition-all"
                placeholder="e.g. 19BBY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-3 top-[38px] w-5 h-5 text-yellow-500/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-yellow-500/30 text-sm font-medium rounded-lg text-black bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center group-hover:scale-105 transition-transform">
                SIGN IN
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            )}
          </button>
        </form>

        {/* Enhanced lightsaber animation */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-blue-500/50 animate-pulse-slow before:content-[''] before:absolute before:inset-0 before:bg-blue-400 before:blur-sm after:content-[''] after:absolute after:inset-0 after:bg-blue-300 after:blur-md"></div>
      </div>
    </div>
  );
}
