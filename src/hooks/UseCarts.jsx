import axios from 'axios';
import React, { useEffect, useState } from 'react'


function UseCarts(count = 0) {
      const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
      const token = localStorage.getItem("userToken");

     const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
        setProducts(data.products);
    } catch (error) {
      setErrors(true);
    } finally {
      setIsLoading(false);
    }
    };
    
      useEffect(() => {
    getProducts();
  }, [products.length]);


  return {products , isLoading , errors , token}

}

export default UseCarts
