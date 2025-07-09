import { Header, Footer } from "./components";
import PropertiesGrid from "./pages/LandingPage/PropertiesGrid";

function App() {
  return (
    <div className="font-inter antialiased">
      <Header />
      {/* <Categories /> */}
      <PropertiesGrid />
      <Footer />
    </div>
  );
}

export default App;
