import React from "react";

const Login = ({ setToggle }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-xs bg-zinc-900 border border-zinc-700 rounded-lg p-8">
        <h1 className="text-4xl font-serif font-bold text-white text-center mb-6">
          Instagram
        </h1>
        <form className="flex flex-col gap-3 mb-3">
          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            placeholder="Phone number, username, or email"
            type="text"
          />
          <input
            className="bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
            placeholder="Password"
            type="password"
          />
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold mt-2"
            type="submit"
          >
            Log in
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-zinc-700"></div>
          <span className="mx-3 text-zinc-400 text-sm font-semibold">OR</span>
          <div className="flex-grow h-px bg-zinc-700"></div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 text-blue-500 font-semibold mb-2"
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            {/* Facebook icon SVG path */}
            <circle cx="12" cy="12" r="12" fill="#2563eb" />
            <path
              d="M13.5 12H12v5H10v-5H9v-2h1v-1c0-1.104.896-2 2-2h1v2h-1c-.552 0-1 .447-1 1v1h2l-.5 2z"
              fill="#fff"
            />
          </svg>
          Log in with Facebook
        </button>
        <div className="text-center mb-3">
          <a href="#" className="text-blue-400 text-sm font-semibold">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="w-full max-w-xs bg-zinc-900 border border-zinc-700 rounded-lg p-5 mt-4 text-center">
        <span className="text-zinc-300 text-sm">
          Don't have an account?{" "}
          <p
            onClick={() => setToggle((prev) => !prev)}
            className="text-blue-400 font-semibold"
          >
            Sign up
          </p>
        </span>
      </div>
    </div>
  );
};

export default Login;
