import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PropertiesGrid from "./pages/LandingPage/PropertiesGrid";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Forbidden403 from "./pages/Errors/403";
import NotFound404 from "./pages/Errors/404";
import ServerError500 from "./pages/Errors/500";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<PropertiesGrid />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/403" element={<Forbidden403 />} />
          <Route path="/500" element={<ServerError500 />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
