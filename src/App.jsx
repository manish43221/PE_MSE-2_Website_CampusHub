import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import MyRegistrationPage from "./pages/MyRegistrationPage";
import HelpPage from "./pages/HelpPage";
import Footer from "./components/Footer";
import FindFriendPage from "./pages/FindFriendPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import HallOfFamePage from "./pages/HallOfFamePage";
import FloatingHelpButton from "./components/FloatingHelpButton";
import eventsData from "./data/events.json";

import { motion, AnimatePresence } from "framer-motion";

// ✅ Animation Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// ✅ Main Content Component
function AppContent({
  user,
  setUser,
  registeredEvents,
  setRegisteredEvents,
  eventRegistrations,
  setEventRegistrations,
  events,
  setEvents,
}) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-all duration-500">
      {user && <NavBar user={user} setUser={setUser} />}

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/login"
              element={
                !user ? (
                  <PageWrapper>
                    <LoginPage setUser={setUser} />
                  </PageWrapper>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route
              path="/help"
              element={
                <PageWrapper>
                  <HelpPage />
                </PageWrapper>
              }
            />

            <Route
              path="/find-friend"
              element={
                <PageWrapper>
                  <FindFriendPage />
                </PageWrapper>
              }
            />

            <Route
              path="/profile"
              element={
                user ? (
                  <PageWrapper>
                    <ProfilePage
                      user={user}
                      setUser={setUser}
                      registeredEvents={registeredEvents}
                    />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                user ? (
                  <PageWrapper>
                    <DashboardPage
                      user={user}
                      registeredEvents={registeredEvents}
                    />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/hall-of-fame"
              element={
                user ? (
                  <PageWrapper>
                    <HallOfFamePage events={events} />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/"
              element={
                user ? (
                  <PageWrapper>
                    <EventPage events={events} />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/events/:id"
              element={
                user ? (
                  <PageWrapper>
                    <EventDetailsPage
                      events={events}
                      user={user}
                      registeredEvents={registeredEvents}
                      setRegisteredEvents={setRegisteredEvents}
                      eventRegistrations={eventRegistrations}
                      setEventRegistrations={setEventRegistrations}
                    />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/admin"
              element={
                <PageWrapper>
                  <AdminPage events={events} setEvents={setEvents} />
                </PageWrapper>
              }
            />

            <Route
              path="/my-registrations"
              element={
                user ? (
                  <PageWrapper>
                    <MyRegistrationPage
                      events={events}
                      user={user}
                      registeredEvents={registeredEvents}
                      registrations={eventRegistrations}
                      setRegisteredEvents={setRegisteredEvents}
                      setRegistrations={setEventRegistrations}
                    />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="*"
              element={<Navigate to={user ? "/" : "/login"} replace />}
            />
          </Routes>
        </AnimatePresence>

        <FloatingHelpButton />
      </main>

      <Footer />
    </div>
  );
}

// ✅ Root App Component
export default function App() {
  const [user, setUser] = useState(null);

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredEvents")) || [];
  });

  const [eventRegistrations, setEventRegistrations] = useState(() => {
    return JSON.parse(localStorage.getItem("eventRegistrations")) || {};
  });

  // ✅ FIX: Initializing directly with eventsData ensures your updated JSON file
  // with the winners is loaded, bypassing any old data in LocalStorage.
  const [events, setEvents] = useState(eventsData);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
    localStorage.setItem(
      "eventRegistrations",
      JSON.stringify(eventRegistrations),
    );
    localStorage.setItem("events", JSON.stringify(events));
  }, [registeredEvents, eventRegistrations, events]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <AppContent
        user={user}
        setUser={setUser}
        registeredEvents={registeredEvents}
        setRegisteredEvents={setRegisteredEvents}
        eventRegistrations={eventRegistrations}
        setEventRegistrations={setEventRegistrations}
        events={events}
        setEvents={setEvents}
      />
    </BrowserRouter>
  );
}