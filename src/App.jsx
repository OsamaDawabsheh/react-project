import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChangePasswordProtected from './auth/ChangePasswordProtected'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import NotFound from './components/NotFound'
import Root from './layout/Root'
import Carts from './pages/Carts/components/Carts'
import Categories from './pages/Categories/components/Categories'
import CategoryDetails from './pages/Categories/components/CategoryDetails'
import ForgotPassword from './pages/ForgotPassword/components/ForgotPassword'
import Home from './pages/Home/components/Home'
import Login from './pages/Login/components/Login'
import Order from './pages/Order/components/Order'
import ProductDetails from './pages/Products/components/ProductDetails'
import Products from './pages/Products/components/Products'
import Information from './pages/Profile/components/Information'
import Orders from './pages/Profile/components/Orders'
import Register from './pages/Register/components/Register'
import SendCode from './pages/SendCode/components/SendCode'
import SubCategory from './pages/SubCategory/components/SubCategory'
import AuthRoutes from './routes/AuthRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			children: [
				{
					// path: "/",
					index: true,
					element: <Home />,
				},
				{
					path: 'products',
					element: <Products />,
				},
				{
					path: 'products/:id',
					element: <ProductDetails />,
				},
				{
					path: 'categories',
					element: <Categories />,
				},
				{
					path: 'categories/:id/subcategory',
					element: <SubCategory />,
				},
				{
					path: 'products/category/:id',
					element: <CategoryDetails />,
				},
				{
					path: 'sendCode',
					element: (
						<ChangePasswordProtected>
							<SendCode />
						</ChangePasswordProtected>
					),
				},
				{
					path: 'forgotPassword',
					element: (
						<ChangePasswordProtected>
							<ForgotPassword />
						</ChangePasswordProtected>
					),
				},
				// ! Protected Routes
				{
					element: <ProtectedRoutes />,
					children: [
						{
							path: 'carts',
							element: <Carts />,
						},
						{
							path: 'order',
							element: <Order />,
						},
						{
							path: 'profile',
							children: [
								{
									index: true,
									element: <Navigate to="orders" replace />,
								},
								{
									path: 'orders',
									element: <Orders />,
								},
								{
									path: 'information',
									element: <Information />,
								},
							],
						},
					],
				},
				// ! Auth Routes
				{
					element: <AuthRoutes />,
					children: [
						{
							path: 'login',
							element: <Login />,
						},
						{
							path: 'register',
							element: <Register />,
						},
					],
				},
				{
					path: '*',
					element: <NotFound />,
				},
			],
		},
	])

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
			<RouterProvider router={router} />
		</>
	)
}

export default App
