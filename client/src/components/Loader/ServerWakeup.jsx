import { FaServer } from "react-icons/fa";
import { PulseLoader } from "react-spinners";

function ServerWakeup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
          <div className="relative bg-gray-900 border border-gray-700 p-4 rounded-full flex items-center justify-center">
            <FaServer className="text-4xl text-blue-400 animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Waking up server</h2>
        <p className="text-gray-400 text-sm mb-8">
          Our backend is spinning back up after a period of inactivity. This usually takes about 30 seconds.
        </p>

        <PulseLoader color="#3b82f6" size={10} />
      </div>
    </div>
  );
}

export default ServerWakeup;
