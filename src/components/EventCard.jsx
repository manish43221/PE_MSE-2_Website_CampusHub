import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import { useState } from "react";

export default function EventCard({ event }) {
  const [hasEnded, setHasEnded] = useState(false);

  const handleEventEnded = () => {
    setHasEnded(true);
  };

  return (
    <Link to={`/events/${event.id}`} className="group block">
      <div className={`rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
        hasEnded 
          ? "bg-slate-700 dark:bg-slate-900 border-slate-600 dark:border-slate-800 opacity-75" 
          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
      }`}>
        
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              hasEnded ? "opacity-50" : ""
            }`}
          />
          <div className="absolute top-4 left-4">
            <span className={`backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              hasEnded
                ? "bg-red-500/90 text-white"
                : "bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400"
            }`}>
              {hasEnded ? "Ended" : event.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className={`text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
            hasEnded 
              ? "text-slate-300 dark:text-slate-400" 
              : "text-slate-900 dark:text-white"
          }`}>
            {event.title}
          </h3>

          <div className={`space-y-2 mt-auto ${hasEnded ? "opacity-60" : ""}`}>
            <div className={`flex items-center text-sm ${
              hasEnded 
                ? "text-slate-400 dark:text-slate-500" 
                : "text-slate-500 dark:text-slate-400"
            }`}>
              <span className="mr-2">Date:</span>
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at {event.time}
            </div>

            <div className={`flex items-center text-sm ${
              hasEnded 
                ? "text-slate-400 dark:text-slate-500" 
                : "text-slate-500 dark:text-slate-400"
            }`}>
              <span className="mr-2">Venue:</span>
              {event.location}
            </div>

            <div className="mt-4">
              <Countdown date={event.date} time={event.time} onEnded={handleEventEnded} />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}