import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import RestaurantMenu from "./components/RestaurantMenu";
import LandingPage from "./components/LandingPage";
import Cart from "./pages/Cart";
import About from "./pages/About";

function App() {
  const UserLocation = useSelector((store) => store.locationData.userLocation);
  return (
    <>
    {
      UserLocation && <Header />
    }
      <Routes>
        {
          UserLocation ? <>
            <Route path="/" element={<Home />} />
            <Route path="/restaurants/:resId" element={<RestaurantMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </> : <Route path="/" element={<LandingPage />} />
        }

      </Routes>
    </>
  )
}

export default App
