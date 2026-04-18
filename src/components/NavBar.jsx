import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ user, setUser }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  const firstName = user?.name?.split(" ")[0] || "User";

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    setUser(null);
  };

  const linkStyle = (path) =>
    `relative px-3 py-1 rounded-lg transition-all duration-300 ${
      location.pathname === path
        ? "text-indigo-600 dark:text-indigo-400"
        : "text-slate-600 dark:text-slate-400"
    } hover:text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-pink-500 hover:shadow-lg hover:shadow-indigo-500/30`;

  return (
    <>
      {/* 🔥 TOP HEADING */}
      <div className="relative text-center py-5 overflow-hidden shadow-md group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_200%]"></div>

        <div className="absolute w-40 h-40 bg-pink-400 opacity-30 rounded-full blur-3xl top-[-30px] left-[-30px] animate-pulse group-hover:scale-125 transition duration-500"></div>
        <div className="absolute w-40 h-40 bg-indigo-400 opacity-30 rounded-full blur-3xl bottom-[-30px] right-[-30px] animate-pulse group-hover:scale-125 transition duration-500"></div>

        <h1 className="relative text-3xl font-extrabold text-white tracking-wide transition-all duration-500 group-hover:scale-110 group-hover:tracking-widest">
          KIET Events 🎉
        </h1>
      </div>

      {/* 🔥 NAVBAR */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
        <div className="w-full flex items-center justify-evenly text-sm font-semibold h-14">
          {/* Discover */}
          <Link to="/" className={linkStyle("/")}>
            <span className="relative group">
              Discover
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* My Tickets */}
          <Link
            to="/my-registrations"
            className={linkStyle("/my-registrations")}
          >
            <span className="relative group">
              My Tickets
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* 🏆 Hall of Fame */}
          <Link to="/hall-of-fame" className={linkStyle("/hall-of-fame")}>
            <span className="relative group">
              Hall of Fame 🏆
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-yellow-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Help */}
          <Link to="/help" className={linkStyle("/help")}>
            <span className="relative group">
              Help
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Find Friend */}
          <Link to="/find-friend" className={linkStyle("/find-friend")}>
            <span className="relative group">
              Find Friend
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-lg hover:scale-110 transition"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Profile */}
          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            <span className="relative group">
              Hi, {firstName}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 hover:scale-110 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}