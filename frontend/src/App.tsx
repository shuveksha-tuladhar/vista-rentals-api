import { Header, Footer } from "./components";
import PropertiesGrid from "./pages/LandingPage/PropertiesGrid";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";

function App() {
  return (
    <div className="font-inter antialiased">
      <Header />
      {/* <Categories /> */}
      {/* <PropertiesGrid /> */}
      <PropertyDetails />
      <Footer />
    </div>
  );
}

export default App;
