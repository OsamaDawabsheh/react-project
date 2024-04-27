/* eslint-disable react/prop-types */
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLoadingContext } from '../hooks/use-loading'
import { asyncHandler } from '../utils/asyncHandler'

export const CartContext = createContext(null)

const CartContextProvider2 = ({ children }) => {
	const [cart, setCart] = useState([])
	const token = localStorage.getItem('userToken')
	const { withLoading } = useLoadingContext()

	const getCartFunc = asyncHandler(async () => {
		const { data } = await axios.get(`/cart`, {
			headers: {
				Authorization: `Tariq__${token}`,
			},
		})
		if (data.message == 'success') {
			setCart(data.products)
		}
	})
	const getCart = () => withLoading(getCartFunc, 'getCart')

	const addToCart = asyncHandler(async productId => {
		const { data } = await axios.post(
			`/cart`,
			{ productId },
			{
				headers: {
					Authorization: `Tariq__${token}`,
				},
			},
		)
		if (data.message == 'success') {
			toast.success('product added successfully')
			getCart()
		}
	})

	async function clearCart() {}
	async function increaseQty() {}
	async function decreaseQty() {}
	async function removeItem() {}

	useEffect(() => {
		if (token) withLoading(getCart, 'getCart')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])

	return (
		<CartContext.Provider
			value={{
				cart,
				setCart,
				addToCart: (pId) => withLoading(() => addToCart(pId), 'addToCart'),
				clearCart,
				increaseQty,
				decreaseQty,
				removeItem,
				getCart,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export default CartContextProvider2
