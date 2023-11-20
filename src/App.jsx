import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Footer from "./components/Footer";

function App() {

  return (
    <Provider store={appStore}>
      <div className="overflow-x-hidden relative">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  )
}

export default App
