import { createContext } from "react";
import UseCarts from "../hooks/UseCarts";


export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    
    const { products } = UseCarts();

    return <CartContext.Provider value={products.length}>
            {children} 
    </CartContext.Provider>
}


export default CartContextProvider;