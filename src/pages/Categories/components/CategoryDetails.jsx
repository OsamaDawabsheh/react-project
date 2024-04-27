import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as styles from './CategoryDetails.module.css';

function CategoryDetails() {
    
   const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [products, setProducts] = useState([]);
    const { id } = useParams();

const getProducts = async () => {
    setIsLoading(true);
    try { 
      const { data } = await axios.get(`/products/category/${id}`);
        setProducts(data.products);
        console.log(data);
    }
    catch(error){
      setErrors(true);
      console.log(error.errors);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

   if (isLoading) {
    return <div className={"p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main" }>
                <div className={`spinner-border ${styles.loader}`} role="status">
                </div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
    </div>
  }

  if (errors) {
    return  <div className='py-5  main'>
            <div className='d-flex gap-3 justify-content-center align-items-center text-danger'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
                  <path className={styles.errorIcon} fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/>
                  <path className={styles.errorIcon} fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"/>
              </svg>
              <h1>Error happened when trying to get data</h1>
      </div>
    </div>
  }


  return (
    <div className='container main'>
        <h1 className='text-center mb-5'>Products</h1>
        <div className='row gy-5 justify-content-center '>
        {
          products.length ?
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
