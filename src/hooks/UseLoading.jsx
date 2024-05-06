import { useContext } from 'react'
import { LoadingContext } from '../context/Loading'

const useLoadingContext = () => {
	const context = useContext(LoadingContext)
	if (!context) {
		throw new Error('useLoadingContext must be used within a LoadingProvider')
	}
	return context
}

export default useLoadingContext;