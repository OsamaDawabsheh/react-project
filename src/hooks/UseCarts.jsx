import { useContext } from "react"
import { CartContext } from "../context/CartContextProvider"

const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider')
    }
    return context
}

export default useCartContext;