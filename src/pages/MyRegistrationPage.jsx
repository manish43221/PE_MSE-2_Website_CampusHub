import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// QR image is rendered with an external image URL.
export default function MyRegistrationPage({
  events,
  user,
  registeredEvents = [],
  registrations = {},
  setRegisteredEvents,
  setRegistrations,
}) {
  const safeRegisteredEvents = registeredEvents || [];
  const myEvents = events.filter((event) =>
    safeRegisteredEvents.includes(event.id),
  );

  const handleCancel = (eventId) => {
    setRegisteredEvents(safeRegisteredEvents.filter((id) => id !== eventId));
    const nextRegistrations = { ...registrations };
    delete nextRegistrations[eventId];
    setRegistrations(nextRegistrations);
    toast.success("Ticket Cancelled.");
  };

  const studentName = user?.name || "Student";
  const studentRoll = user?.roll || "N/A";

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black mb-8 dark:text-white">
        My Tickets
      </h1>

      {myEvents.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-3xl">
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            No tickets yet!
          </h2>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
          >
            Discover Events
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {myEvents.map((event) => {
            const registration = registrations[event.id] || {};
            const ticketName = registration.name || studentName;
            const ticketRoll = registration.roll || studentRoll;
            const ticketEmail = registration.email || user?.email || "-";
            const ticketPhone = registration.phone || "-";
            const qrData = `Ticket | ${ticketName} | ${ticketRoll} | ${event.title} | ${ticketEmail} | ${ticketPhone}`;
            const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;

            return (
              <div
                key={event.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow flex flex-col md:flex-row items-center gap-6 border border-slate-200 dark:border-slate-700"
              >
                <div className="grow text-center md:text-left">
                  <h3 className="text-2xl font-bold dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-slate-500 mt-2">
                    {new Date(event.date).toDateString()} @ {event.time}
                  </p>
                  <p className="text-slate-500 mt-1">
                    Student: {ticketName} ({ticketRoll})
                  </p>
                  <p className="text-slate-500 mt-1">Email: {ticketEmail}</p>
                  <p className="text-slate-500 mt-1">Phone: {ticketPhone}</p>
                  <button
                    onClick={() => handleCancel(event.id)}
                    className="mt-4 text-red-500 font-bold hover:text-red-700"
                  >
                    Cancel Ticket
                  </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border">
                  <img
                    src={qrImageUrl}
                    alt="Ticket QR Code"
                    className="w-[120px] h-[120px]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}