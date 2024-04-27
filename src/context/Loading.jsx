/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const LoadingContext = createContext(null)

const Loading = ({ children }) => {
	const [loading, setLoading] = useState({})

	async function withLoading(fn, key) {
		setLoading(prev => ({ ...prev, [key]: true }))
		await fn()
		setLoading(prev => ({ ...prev, [key]: false }))
	}

	return (
		<LoadingContext.Provider
			value={{
				loading,
				withLoading,
			}}
		>
			{children}
		</LoadingContext.Provider>
	)
}

export default Loading
