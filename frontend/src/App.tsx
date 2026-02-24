import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ToastContainer from "./components/Toast/ToastContainer";
import PropertiesGrid from "./pages/LandingPage/PropertiesGrid";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import PropertiesMapView from "./pages/PropertiesMapView/PropertiesMapView";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
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
import { LoaderProvider, useLoader } from "./context/LoaderContext";
import { Loader } from "./components/Loader";
import AboutUs from "./pages/AboutUs/AboutUs";
import BecomeAHost from "./pages/BecomeAHost/BecomeAHost";
import HostListingsPage from "./pages/HostListings";
import EditListingPage from "./pages/HostListings/EditListingPage";
import ProtectedRoute from "./components/ProtectedRoute";

interface MeResponse {
  user: UserResponse;
}

const AppContent = () => {
  const { setUser, user, logout } = useAuthStore();
  const { addToast } = useToastStore();
  const { setIsLoading } = useLoader();

  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await fetchWithTimeout(
          import.meta.env.VITE_API_BASE_URL || "http://localhost:4000",
          3000,
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
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchCurrentUser();
    }
  }, [setUser, addToast, user, logout, setIsLoading]);

  const fetchWithTimeout = (url: string, timeout = 5000) => {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), timeout),
      ),
    ]);
  };

  return (
    <NoticeProvider showNotice={showNotice}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/become-a-host" element={<ProtectedRoute><BecomeAHost /></ProtectedRoute>} />
          <Route path="/host/listings" element={<ProtectedRoute><HostListingsPage /></ProtectedRoute>} />
          <Route path="/host/listings/:id/edit" element={<ProtectedRoute><EditListingPage /></ProtectedRoute>} />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<PropertiesGrid />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/properties" element={<PropertiesMapView />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/review" element={<SummaryPage />} />
                  <Route path="/complete" element={<BookingComplete />} />
                  <Route path="/403" element={<Forbidden403 />} />
                  <Route path="/500" element={<ServerError500 />} />
                  <Route path="*" element={<NotFound404 />} />
                </Routes>
                {showNotice && <StatusCheck />}
              </Layout>
            }
          />
        </Routes>
        <Loader />
      </Router>
    </NoticeProvider>
  );
};

const App = () => {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
};

export default App;
