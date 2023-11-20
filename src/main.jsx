import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/index.css"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from './components/Error.jsx'

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu.jsx"));

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Suspense fallback={<h1>Loading...</h1>}><Home /></Suspense>
      },
      {
        path : "/restaurants/:resId",
        element : <Suspense fallback={<h1>Loading...</h1>}><RestaurantMenu /></Suspense>
      },
      {
        path : "/about",
        element : <Suspense fallback={<h1>Loading...</h1>}><About /></Suspense>
      },
      {
        path : "/cart",
        element : <Suspense fallback={<h1>Loading...</h1>}><Cart /></Suspense>
      }
    ],
    errorElement : <Error />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)
