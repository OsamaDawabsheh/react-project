import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartContextProvider from '../context/CartContextProvider'
import Error from '../context/Errors'
import Loading from '../context/Loading'

function Root() {
	
	return (
		<>
			<Loading>
				<Error>
					<CartContextProvider>
						<Navbar />
						<Outlet />
						<Footer />
					</CartContextProvider>
				</Error>
			</Loading>
		</>
	)
}

export default Root
