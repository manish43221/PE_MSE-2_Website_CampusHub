import { useState } from "react";
import { Link } from "react-router-dom";
import events from "../data/events.json";
import { motion } from "framer-motion";

export default function DashboardPage({ user, registeredEvents = [] }) {
  const today = new Date().toISOString().split("T")[0];

  // Get registered events (upcoming)
  const upcomingEvents = events.filter(event => 
    registeredEvents.includes(event.id) && event.date >= today
  );

  // Get completed events (past)
  const completedEvents = events.filter(event => 
    registeredEvents.includes(event.id) && event.date < today
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4">

        {/* 🔥 Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-white mb-2">
            Welcome, {user.name}! 👋
          </h1>
          <p className="text-slate-400 text-lg">Your KIET Events Dashboard</p>
        </motion.div>

        {/* 🔥 User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 backdrop-blur-xl border border-indigo-400/30 rounded-2xl p-8 mb-12 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Name */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-slate-400 text-sm font-semibold mb-1">Name</p>
              <p className="text-white text-lg font-bold">{user.name}</p>
            </div>

            {/* Roll Number */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-slate-400 text-sm font-semibold mb-1">Roll Number</p>
              <p className="text-white text-lg font-bold">{user.roll}</p>
            </div>

            {/* Email */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-slate-400 text-sm font-semibold mb-1">Email</p>
              <p className="text-white text-lg font-bold">{user.email}</p>
            </div>

            {/* Branch */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-slate-400 text-sm font-semibold mb-1">Branch</p>
              <p className="text-white text-lg font-bold">{user.branch}</p>
            </div>

            {/* Year */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-slate-400 text-sm font-semibold mb-1">Year</p>
              <p className="text-white text-lg font-bold">{user.year}</p>
            </div>

            {/* Events Registered */}
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-slate-400 text-sm font-semibold mb-1">Events Registered</p>
              <p className="text-white text-lg font-bold">{registeredEvents.length}</p>
            </div>
          </div>
        </motion.div>

        {/* 🔥 Currently Registered Events */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            📅 Currently Registered Events
            <span className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
              {upcomingEvents.length}
            </span>
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden hover:border-indigo-400/50 transition-all hover:shadow-xl hover:shadow-indigo-500/20"
                >
                  {/* Event Image */}
                  <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />

                  {/* Event Info */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{event.description.slice(0, 100)}...</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-slate-300 text-sm">📅 {event.date}</p>
                      <p className="text-slate-300 text-sm">⏰ {event.time}</p>
                      <p className="text-slate-300 text-sm">📍 {event.venue}</p>
                      <p className="text-slate-300 text-sm">🏷️ {event.category}</p>
                    </div>

                    <Link
                      to={`/events/${event.id}`}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition text-center block"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 text-center">
              <p className="text-slate-400 text-lg">No upcoming events registered yet.</p>
              <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-semibold mt-2 inline-block">
                Browse Events →
              </Link>
            </div>
          )}
        </div>

        {/* 🔥 Previously Completed Events */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            🎉 Previously Completed Events
            <span className="ml-3 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold">
              {completedEvents.length}
            </span>
          </h2>

          {completedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-green-400/50 transition-all hover:shadow-xl hover:shadow-green-500/20 opacity-75 hover:opacity-100"
                >
                  {/* Event Image */}
                  <img src={event.image} alt={event.title} className="w-full h-40 object-cover opacity-70" />

                  {/* Event Info */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{event.description.slice(0, 100)}...</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-slate-400 text-sm">📅 {event.date}</p>
                      <p className="text-slate-400 text-sm">⏰ {event.time}</p>
                      <p className="text-slate-400 text-sm">📍 {event.venue}</p>
                      <p className="text-slate-400 text-sm">🏷️ {event.category}</p>
                    </div>

                    <div className="bg-green-500/20 border border-green-400/50 py-2 rounded-lg text-center">
                      <p className="text-green-400 font-semibold text-sm">✅ Completed</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 text-center">
              <p className="text-slate-400 text-lg">No completed events yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}