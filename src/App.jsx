import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Footer from "./components/Footer";

function App() {
  const {pathname} = useLocation();

  return (
    <Provider store={appStore}>
      <div className="overflow-x-hidden">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  )
}

export default App
