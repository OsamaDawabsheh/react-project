import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import ProtectedRouter from './auth/ProtectedRouter';
import ChangePasswordProtected from './auth/ChangePasswordProtected';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Root from './layout/Root';
import Home from './pages/Home/components/Home';
import Products from './pages/Products/components/Products';
import Categories from './pages/Categories/components/Categories';
import Carts from './pages/Carts/components/Carts';
import Login from './pages/Login/components/Login';
import Register from './pages/Register/components/Register';
import SendCode from './pages/SendCode/components/SendCode';
import ForgotPassword from './pages/ForgotPassword/components/ForgotPassword';
import NotFound from './components/NotFound';
import './App.css'
import SubCategory from './pages/SubCategory/components/SubCategory';
import ProductDetails from './pages/Products/components/ProductDetails';
import CategoryDetails from './pages/Categories/components/CategoryDetails';
import Order from './pages/Order/components/Order';
import CartContextProvider from './context/Cart';
import Profile from './pages/Profile/components/Profile';
import Orders from './pages/Profile/components/Orders';
import Information from './pages/Profile/components/Information';
import UserRouter from './auth/UserRouter';



function App() {

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
          path: "/products/:id",
          element: <ProductDetails/>
        },
        {
          path: "/categories",
          element: <Categories/>
        },
        {
          path: "/categories/:id/subcategory",
          element: <SubCategory/>
        },
        {
          path: "/products/category/:id",
          element: <CategoryDetails/>
        },
        {
          path: "/carts",
          element: <ProtectedRouter>
              <Carts />
          </ProtectedRouter> 
        },
        {
          path: "/order",
          element:
            <Order/>
          
        },
        {
          path: "/login",
          element: <ProtectedRouter>
            <Login />
          </ProtectedRouter>
        },
        {
          path: "/register",
          element: <ProtectedRouter>
          <Register />
          </ProtectedRouter>
        },
        {
          path: "/sendCode",
          element: <ChangePasswordProtected>
          <SendCode/>
          </ChangePasswordProtected>
        },
        {
          path: "/forgotPassword",
          element: <ChangePasswordProtected>
            <ForgotPassword />
          </ChangePasswordProtected>
        },
        {
          path: "/profile",
          element: <UserRouter>
            <Profile />,
          </UserRouter>,
          children: [
            {
            index: true, element: <Navigate to="orders" replace />
          },
            {
              path: 'orders',
              element: <Orders/>
            },
            {
              path: 'information',
              element: <Information/>
            }
          ]
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
      <CartContextProvider>
      <RouterProvider router={router} />
</CartContextProvider>
      <ToastContainer />
    </>
  )
}

export default App
