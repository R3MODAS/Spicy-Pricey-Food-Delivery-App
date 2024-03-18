import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import LocationSidebar from "./components/Sidebar/LocationSidebar"
import ScrollToTop from "./components/ScrollToTop"
import LoginSidebar from "./components/Sidebar/LoginSidebar"

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