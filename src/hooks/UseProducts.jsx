import axios from 'axios';
import { useEffect, useState } from 'react';

function UseProducts(sort = "" , minPrice = "" , maxPrice = "" , search = "" , page = 1 , limit = 4  ) {
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
    
    useEffect(() => {
        getProducts();
    },[page , numberOfPages])

    const getProducts = async (e) => {
    let numberOfProducts = 0;
    setIsLoading(true);
    try {
      if (sort || minPrice || maxPrice || search) {
        const { data } = await axios.get(
          `/products?sort=${sort}&search=${search}`
        );
        setProducts(data.products);
        numberOfProducts = data.total;
      } else {
        const { data } = await axios.get(
          `/products?page=${page}&limit=${limit}`
          );
        setProducts(data.products);
        numberOfProducts = data.total;
      }
    } catch (error) {
      setErrors(true);
      console.log(error);
    } finally {
      setIsLoading(false);
      setNumberOfPages(Math.ceil(numberOfProducts / limit));
    }
    };
    

  return {products , isLoading , errors , numberOfPages}
}

export default UseProducts;
