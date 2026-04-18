import { useState, useEffect } from "react";

export default function Countdown({ date, time, onEnded }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
     
    const targetDate = new Date(`${date} ${time}`).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsEnded(true);
        if (onEnded) onEnded();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time, onEnded]);

  if (isEnded) {
    return (
      <div className="flex items-center justify-center md:justify-start">
        <div className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold text-center">
          Event Ended
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 dark:bg-slate-800 rounded-2xl text-xl font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-slate-700 shadow-sm">
            {item.value < 10 ? `0${item.value}` : item.value}
          </div>
          <span className="text-xs text-slate-500 mt-2 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}