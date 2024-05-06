import axios from 'axios';
import { useEffect, useState } from 'react';
import useErrorContext from "../hooks/UseErrors";
import useLoadingContext from "../hooks/UseLoading";
import asyncHandler from "../utils/asyncHandler";

function UseProducts(sort = "" , minPrice = "" , maxPrice = "" , search = "" , page = 1 , limit = 4  ) {
  const [products, setProducts] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const { loading, withLoading } = useLoadingContext();
  const {error , withError} = useErrorContext();
    
    useEffect(() => {
        getProducts();
    }, [page, numberOfPages])
  
   const getProducts = async (e) => {
     let numberOfProducts = 0;
     withLoading(asyncHandler ( async () => {
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
           setNumberOfPages(Math.ceil(numberOfProducts / limit));

    }
  }, withError, "getProducts")
       , "getProducts");
     
   };


  return {products , loading , error , numberOfPages}
}

export default UseProducts;
