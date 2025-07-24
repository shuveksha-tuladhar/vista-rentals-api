export default function StatusCheck() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white text-gray-800 px-6 py-5 rounded-2xl border border-rose-200 shadow-2xl font-sans text-center max-w-lg w-full mx-4">
        <h2 className="text-2xl font-semibold text-rose-600 mb-2">Initializing Server</h2>
        <p className="text-base">
          This app is currently running on a free tier server and may take a few minutes to start. Thank you for your patience.
        </p>
        <p className="text-base">
         - Shuveksha
        </p>
      </div>
    </div>
  );
}


