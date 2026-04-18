import { useState } from "react";
import EventCard from "../components/EventCard";
import FiltersBar from "../components/FiltersBar";

export default function EventPage({ events }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(events.map((event) => event.category))];

  // Check if event has ended
  const hasEventEnded = (date, time) => {
    const targetDate = new Date(`${date} ${time}`).getTime();
    const now = new Date().getTime();
    return now > targetDate;
  };

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      // Active events first, ended events last
      const aEnded = hasEventEnded(a.date, a.time);
      const bEnded = hasEventEnded(b.date, b.time);
      
      if (aEnded === bEnded) return 0;
      return aEnded ? 1 : -1;
    });

  return (
    <div className="animate-in fade-in duration-500">

      {/* ✅ CENTERED HEADER */}
      <div className="w-full py-10 mb-8 text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl">

  <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3">
    Upcoming Events
  </h1>

  <p className="text-lg text-slate-600 dark:text-slate-300 px-4">
    Discover technical workshops, cultural fests, and hackathons happening around the KIET campus.
  </p>

</div>
      <FiltersBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="text-5xl mb-4">No match</div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
            No events found
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}