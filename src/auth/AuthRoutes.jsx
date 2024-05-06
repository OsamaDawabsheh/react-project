import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () => {
	const token = localStorage.getItem('userToken')

	if (token) {
		return <Navigate to="/" />
	}

	return <Outlet />
}

export default AuthRoutes
