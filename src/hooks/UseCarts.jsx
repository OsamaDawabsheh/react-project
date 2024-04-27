import axios from 'axios'
import { useEffect, useState } from 'react'

function UseCarts() {
	const [errors, setErrors] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [products, setProducts] = useState([])
	const token = localStorage.getItem('userToken')

	const getProducts = async () => {
		setIsLoading(true)

		try {
			const { data } = await axios.get(`/cart`, {
				headers: {
					Authorization: `Tariq__${token}`,
				},
			})

			setProducts(data.products)
		} catch (error) {
			setErrors(true)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (token) {
			getProducts()
		}
	}, [])

	return { products, isLoading, errors, token, getProducts }
}

export default UseCarts
