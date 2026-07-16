import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ServerWakeup from "./components/Loader/ServerWakeup";
import API from "./services/weatherApi";

function App() {
  const [serverStatus, setServerStatus] = useState(
    sessionStorage.getItem("serverReady") ? "ready" : "checking"
  );
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (serverStatus === "ready") return;

    const timer = setTimeout(() => setShowLoading(true), 1500);

    const checkServer = async () => {
      try {
        await API.get("/");
        clearTimeout(timer);
        sessionStorage.setItem("serverReady", "true");
        setServerStatus("ready");
      } catch (error) {
        clearTimeout(timer);
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          setServerStatus("ready"); // Let them in if it times out
        } else {
          // If we get a 404 or other status, the server is awake!
          sessionStorage.setItem("serverReady", "true");
          setServerStatus("ready");
        }
      }
    };

    checkServer();

    return () => clearTimeout(timer);
  }, [serverStatus]);

  if (serverStatus === "checking") {
    if (showLoading) return <ServerWakeup />;
    return <div className="min-h-screen bg-gray-900"></div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
  );
}

export default App;
