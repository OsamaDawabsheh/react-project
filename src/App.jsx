import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Root from './layout/Root';
import Home from './pages/Home/components/Home';
import Products from './pages/Products/components/Products';
import Categories from './pages/Categories/components/Categories';
import Carts from './pages/Carts/components/Carts';
import Login from './pages/Login/components/Login';
import Register from './pages/Register/components/Register';
import './App.css'
import NotFound from './components/NotFound';



function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/products",
          element: <Products/>
        },
        {
          path: "/categories",
          element: <Categories/>
        },
        {
          path: "/carts",
          element: <Carts/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "*",
          element: <NotFound/>
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
