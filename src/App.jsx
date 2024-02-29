import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import LocationSidebar from "./components/LocationSidebar"
import ScrollToTop from "./components/ScrollToTop"
import LoginSidebar from "./components/LoginSidebar"

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <LocationSidebar />
      <LoginSidebar />
      <ScrollToTop />
    </>
  )
}

export default App