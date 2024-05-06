import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useErrorContext from '../../../hooks/UseErrors';
import useLoadingContext from '../../../hooks/UseLoading';
import asyncHandler from '../../../utils/asyncHandler';
import * as styles from './CategoryDetails.module.css';

function CategoryDetails() {
    
  const { loading, withLoading } = useLoadingContext();
  const { error, withError } = useErrorContext();
    const [products, setProducts] = useState([]);
    const { id } = useParams();

   const getProducts = () =>
     withLoading(
       asyncHandler(async () => {
         const { data } = await axios.get(`/products/category/${id}`);
         if (data.message == "success") {
           setProducts(data.products);
         }
       }, withError ,"categoryDetails"),
       "categoryDetails"
     );
  
  useEffect(() => {
    getProducts();
  }, []);

   if (error.categoryDetails) {
     return (
       <div className="py-5  main">
         <div className="d-flex gap-3 justify-content-center align-items-center text-danger">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             width="100px"
             height="100px"
             viewBox="0 0 24 24"
           >
             <path
               className="errorIcon"
               fill="currentColor"
               d="M11.001 10h2v5h-2zM11 16h2v2h-2z"
             />
             <path
               className="errorIcon"
               fill="currentColor"
               d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"
             />
           </svg>
           <h1>{error.categoryDetails}</h1>
         </div>
       </div>
     );
   }
   if(loading.categoryDetails) return loading.categoryDetails;

  return (
    <div className='container main'>
      <h1 className='text-center mb-5'>Products</h1>         
            <div className='row gy-5 justify-content-center '>
              {
              products ?
                products.map((product) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={product._id}>
                    <div className={`card h-100 d-flex align-items-center ${styles.productCard}`}>
                      <Link className="w-100 h-100" to={`/products/${product._id}`}
                      >
                        <img
                          className="card-img-top h-100 object-fit-cover "
                          src={product.mainImage.secure_url}
                          alt="product image"
                        />
                      </Link>
                      <div className="card-body w-100 text-center d-flex flex-column gap-3">
                        <h5 className="card-title ">{product.name}</h5>
                      </div>
                    </div>
                  </div>
                ))
                : <div className="text-secondary pt-5 d-flex justify-content-center align-items-center"><h3 className='mt-5'>No Products</h3></div>
                      
                      
            }
          </div>
      
    </div>
  )
}

export default CategoryDetails
