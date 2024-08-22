import Header from "@/components/common/Header";
import { Outlet } from "react-router-dom";
import LocationSidebar from "@/components/sidebar/LocationSidebar";
import LoginSidebar from "@/components/sidebar/LoginSidebar";
import ScrollToTop from "@/components/common/ScrollToTop";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Header />
            <Outlet />
            <LocationSidebar />
            <LoginSidebar />
            <ScrollToTop />
            <Toaster
                toastOptions={{
                    className: "font-ProximaNovaSemiBold",
                    position: "top-center",
                    duration: 1500,
                }}
            />
        </>
    );
};

export default App;
