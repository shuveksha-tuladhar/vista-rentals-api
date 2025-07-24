import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PropertiesGrid from "./pages/LandingPage/PropertiesGrid";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Forbidden403 from "./pages/Errors/403";
import NotFound404 from "./pages/Errors/404";
import ServerError500 from "./pages/Errors/500";
import { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { getApi } from "./utils/api";
import { useToastStore } from "./store/toastStore";
import type { UserResponse } from "./components/Auth/LoginForm";
import SummaryPage from "./pages/SummaryPage/SummaryPage";
import BookingComplete from "./pages/BookingComplete/BookingComplete";
import StatusCheck from "./StatusCheck";
import { NoticeProvider } from "./context/NoticeContext";

interface MeResponse {
  user: UserResponse;
}

const App = () => {
  const { setUser, user, logout } = useAuthStore();
  const { addToast } = useToastStore();

  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await fetchWithTimeout(
          import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
          5000
        );
        setShowNotice(false);
      } catch (error) {
        console.error("Backend is waking up or unreachable:", error);
        setShowNotice(true);
        setTimeout(() => checkServerStatus(), 30000);
      }
    };

    checkServerStatus();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getApi<MeResponse>("/me");
        if (!response.data) throw new Error("Not authenticated");

        setUser(response.data?.user);
      } catch (error) {
        if (user) {
          console.error("Error on fetching user:", error);
          setUser(null);
          addToast({
            message: "Session expired, please log in again.",
            type: "error",
          });
          logout();
        }
      }
    };

    if (!user) {
      fetchCurrentUser();
    }
  }, [setUser, addToast, user, logout]);

  const fetchWithTimeout = (url: string, timeout = 5000) => {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout)
      ),
    ]);
  };

  return (
    <NoticeProvider showNotice={showNotice}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PropertiesGrid />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/review" element={<SummaryPage />} />
            <Route path="/complete" element={<BookingComplete />} />
            <Route path="/403" element={<Forbidden403 />} />
            <Route path="/500" element={<ServerError500 />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
          {showNotice && <StatusCheck />}
        </Layout>
      </Router>
    </NoticeProvider>
  );
};

export default App;
