import { useEffect } from "react";
import { createContext, useState } from "react";
import UseCarts from "../hooks/UseCarts";


export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    
    const { products } = UseCarts();
    const [count, setCount] = useState(); 

    useEffect(() => {
        setCount(products.length);
    }, [products.length])
  
  const updateCount = (newValue) => {
    setCount(newValue);
  };

    return <CartContext.Provider value={{ count , updateCount }}>
            {children} 
    </CartContext.Provider>
}


export default CartContextProvider;