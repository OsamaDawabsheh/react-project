/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const LoadingContext = createContext(null)

const Loading = ({ children }) => {
	const [loading, setLoading] = useState({})

	async function withLoading(fn, key) {
		setLoading(prev => ({
			...prev, [key]: (
				<div className={"p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main"}>
					<div className={`spinner-border loader`} role="status">
					</div>
					<span className="sr-only fs-5 fw-bold">Loading...</span>
				</div>
			)}));
		await fn()
		setLoading(prev => ({ ...prev, [key]: '' }))
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
