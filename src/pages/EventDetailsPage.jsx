import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Countdown from "../components/Countdown";

export default function EventDetailsPage({
  events,
  user,
  registeredEvents,
  setRegisteredEvents,
  eventRegistrations = {},
  setEventRegistrations,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    roll: user?.roll || "",
    email: user?.email || "",
    phone: "",
    branch: user?.branch || "",
    year: user?.year || "",
  });

  const event = events.find((e) => e.id === id);

  if (!event)
    return <div className="text-center mt-20 font-bold dark:text-white">Event not found!</div>;

  const isRegistered = registeredEvents.includes(id);
  const registrationDetails = eventRegistrations[id];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.roll || !formData.email || !formData.phone) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (!isRegistered) {
      setRegisteredEvents([...registeredEvents, id]);
    }

    setEventRegistrations({
      ...eventRegistrations,
      [id]: { ...formData },
    });

    toast.success("Registration successful! Ticket added to My Tickets.");
    setShowForm(false);
  };

  const handleCancel = () => {
    setRegisteredEvents(registeredEvents.filter((eventId) => eventId !== id));
    const nextRegistrations = { ...eventRegistrations };
    delete nextRegistrations[id];
    setEventRegistrations(nextRegistrations);
    toast.success("Registration cancelled.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-indigo-600 font-bold hover:underline"
      >
        ← Back to Events
      </button>

      <div className={`rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 ${hasEnded
          ? "bg-slate-100 dark:bg-slate-900 border-red-500/30"
          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        }`}>
        {/* Banner Image */}
        <div className="relative h-72">
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover ${hasEnded ? "grayscale opacity-60" : ""}`}
          />
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${hasEnded ? "bg-red-600 text-white" : "bg-indigo-600 text-white"
              }`}>
              {hasEnded ? "Past Event" : event.category}
            </span>
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-black dark:text-white mb-4">{event.title}</h1>

          {/* 📍 Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Venue", value: event.location || "KIET Campus", icon: "📍" },
              { label: "Date", value: event.date, icon: "📅" },
              { label: "Price", value: event.price || "Free", icon: "💰" },
              { label: "Mode", value: event.mode || "Offline", icon: "⚡" }
            ].map((info, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-700/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-600 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">{info.label}</p>
                <p className="text-sm font-bold dark:text-white truncate">{info.value}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {event.description}
          </p>

          {/* ⏳ Countdown Section */}
          <div
            className={`p-8 rounded-3xl mb-8 text-center transition-colors ${hasEnded
                ? "bg-red-50 dark:bg-red-900/10"
                : "bg-indigo-50 dark:bg-indigo-900/10"
              }`}
          >
            <h3 className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs mb-4">
              {hasEnded ? "Event has ended" : "Event Countdown"}
            </h3>

            <div className="flex justify-center items-center">
              <Countdown
                date={event.date}
                time={event.time}
                onEnded={() => setHasEnded(true)}
              />
            </div>
          </div>

          {/* 📜 Rules Section */}
          {event.rules && (
            <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-4 dark:text-white flex items-center gap-2">
                📋 Event Guidelines
              </h3>
              <ul className="space-y-2">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-indigo-500">•</span> {rule}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 🎟️ Registration Feedback */}
          {isRegistered && (
            <div className="mb-8 flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5 rounded-2xl">
              <div className="text-3xl">✅</div>
              <div>
                <p className="font-bold text-emerald-800 dark:text-emerald-300">You're on the list!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">Check "My Tickets" for your entry pass.</p>
              </div>
            </div>
          )}

          {/* ✍️ Registration Form */}
          {showForm && !isRegistered && (
            <div className="bg-slate-50 dark:bg-slate-900/80 p-6 rounded-3xl border dark:border-slate-700 mb-8 animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xl font-bold mb-6 dark:text-white">Confirm Your Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-4 rounded-xl border bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input name="roll" value={formData.roll} onChange={handleChange} placeholder="Roll Number" className="p-4 rounded-xl border bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-4 rounded-xl border bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="p-4 rounded-xl border bg-white dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="submit" className="flex-1 bg-indigo-600 text-white p-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30">Confirm Registration</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 rounded-xl border border-slate-300 dark:border-slate-600 dark:text-white font-bold">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* 🚀 Main Action Button */}
          <button
            onClick={isRegistered ? handleCancel : () => setShowForm(true)}
            disabled={hasEnded && !isRegistered}
            className={`w-full p-5 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-xl ${hasEnded && !isRegistered
                ? "bg-slate-400 cursor-not-allowed text-white shadow-none"
                : isRegistered
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30"
              }`}
          >
            {hasEnded && !isRegistered
              ? "REGISTRATION CLOSED"
              : isRegistered
                ? "CANCEL REGISTRATION"
                : "REGISTER NOW"}
          </button>
        </div>
      </div>
    </div>
  );
}