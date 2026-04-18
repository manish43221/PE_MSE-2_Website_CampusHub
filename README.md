🚀 KIET Events Portal
A feature-rich, professional event management and registration system built specifically for the KIET Group of Institutions. This portal empowers students to discover events, track their registrations, and celebrate winners through a dynamic Hall of Fame.

✨ Key Features
🔐 Secure Authentication: Integrated login system using Roll Numbers and passwords for student-only access.
📅 Event Discovery: Explore technical, cultural, and sports events with detailed descriptions, rules, and live venue info.
🏆 Hall of Fame: A prestigious section displaying past winners with gradient-styled ranking badges (Winner, Runner Up, Third Place).
⏳ Live Countdown: Real-time countdown timers for upcoming events to drive engagement.
🎟️ Smart Ticket System: Instant registration with auto-filled student details and a dedicated "My Tickets" section.
🌓 Dark Mode Support: Seamlessly switch between light and dark themes with custom Tailwind variants.
📱 Fully Responsive: Built with a mobile-first approach using Tailwind CSS v4 and Framer Motion for smooth animations.
🛠️ Tech Stack
Frontend: React.js (Vite)
Styling: Tailwind CSS v4
Animations: Framer Motion
State Management: React Hooks (useState, useEffect, useParams)
Notifications: React Hot Toast
Deployment: Netlify
📁 Project Structure
kiet-events/
├── public/
│   ├── background.jpeg          # Campus background image
│   ├── _redirects        # Fix for Netlify 404 on refresh
│   └── events.json       # Central database for all events
├── src/
│   ├── components/       # Reusable UI (NavBar, Countdown, ProtectedRoute)
│   ├── pages/            # Main Views (LoginPage, HallOfFame, EventDetails)
│   ├── App.jsx           # Routing & Global State Logic
│   └── index.css         # Tailwind v4 Directives & Global Styles
├── package.json          # Dependencies & Scripts
└── vite.config.js        # Vite & Tailwind Plugin Configuration
