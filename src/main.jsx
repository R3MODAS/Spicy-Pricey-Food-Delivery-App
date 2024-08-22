import ReactDOM from "react-dom/client";
import App from "./App";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Checkout, Error, Home } from "@/pages";
import RestaurantMenu from "@/components/menu/RestaurantMenu";
import store from "@/utils/store";
import ShimmerHome from "./components/shimmer/ShimmerHome";
import ShimmerMenu from "./components/shimmer/ShimmerMenu";
import "@/css/index.css";

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<ShimmerHome />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/restaurants/:resId",
                element: (
                    <Suspense fallback={<ShimmerMenu />}>
                        <RestaurantMenu />
                    </Suspense>
                ),
            },
        ],
        errorElement: <Error />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={appRouter} />
    </Provider>,
);
