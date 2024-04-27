import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartContextProvider from '../context/Cart'
import CartContextProvider2 from '../context/CartContextProvider'
import Loading from '../context/Loading'

function Root() {
	
	return (
		<>
			<Loading>
				<CartContextProvider>
					<CartContextProvider2>
						<Navbar />
						<Outlet />
						<Footer />
					</CartContextProvider2>
				</CartContextProvider>
			</Loading>
		</>
	)
}

export default Root
