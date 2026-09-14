import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Navber from "./pages/Navber";
import HexShaft from "./components/HexShaft";

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <HexShaft />
      </div>
      <div className="relative z-10">
        <Navber />
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App;