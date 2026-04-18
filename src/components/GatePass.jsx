import { QRCodeCanvas } from "qrcode.react";

export default function GatePass({ data }) {
  return (
    <div className="w-[300px] bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">

      {/* Header */}
      <div className="bg-indigo-600 text-white text-center py-3 font-bold">
        🎫 KIET Gate Pass
      </div>

      {/* Content */}
      <div className="p-4 text-sm text-slate-700 dark:text-slate-200 space-y-2">
        <p><strong>Event:</strong> {data.event}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Roll:</strong> {data.roll}</p>
        <p><strong>Venue:</strong> {data.venue}</p>
        <p><strong>Date:</strong> {data.date}</p>
      </div>

      {/* QR Code */}
      <div className="flex justify-center pb-4">
        <QRCodeCanvas
          value={`${data.name}-${data.roll}-${data.event}`}
          size={120}
        />
      </div>
    </div>
  );
}