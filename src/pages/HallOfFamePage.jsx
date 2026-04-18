import { motion } from "framer-motion";

export default function HallOfFamePage({ events = [] }) {
  // Get current date to filter out future events
  const today = new Date();
  const winnersList = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);

    // ✅ Only show winners for events that have already happened
    if (eventDate <= today && event.winners && event.winners.length > 0) {
      event.winners.forEach((winnerObj) => {
        winnersList.push({
          ...winnerObj,
          eventTitle: event.title,
        });
      });
    }
  });

  // Function to handle rank colors
  const getRankStyle = (pos) => {
    switch (pos) {
      case "Winner":
        return "from-yellow-400 to-orange-500 text-transparent bg-clip-text font-black";
      case "Runner Up":
        return "from-slate-300 to-slate-500 text-transparent bg-clip-text font-black";
      case "Third Place":
        return "from-orange-400 to-red-600 text-transparent bg-clip-text font-black";
      default:
        return "text-indigo-400 font-bold";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white mb-3 tracking-tighter"
          >
            🏆 HALL OF FAME
          </motion.h1>
          <p className="text-slate-400 text-lg uppercase tracking-widest text-sm">
            KIET Group of Institutions • 2026
          </p>
        </header>

        {winnersList.length === 0 ? (
          <div className="text-center p-16 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
            <p className="text-slate-500 text-xl font-medium">
              No champions crowned yet for past events.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {winnersList.map((winner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative flex justify-between items-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Background Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />

                <div className="relative z-10">
                  <h3 className="text-white text-3xl font-bold tracking-tight mb-2">
                    {winner.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
                      {winner.eventTitle}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-600" />
                    <span className="text-slate-500 font-mono text-sm">
                      {winner.roll}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mb-1 font-bold">
                    Official Result
                  </p>
                  <span
                    className={`text-2xl uppercase italic bg-gradient-to-r ${getRankStyle(winner.position)}`}
                  >
                    {winner.position}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}