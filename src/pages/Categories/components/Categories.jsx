import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import * as styles from './Categories.module.css'
import { NavLink } from 'react-router-dom';
import UseCategories from '../../../hooks/UseCategories';

 
function Categories() {
  
  
  const { categories, isLoading, errors } = UseCategories();

 
  return (
    <div className='container main'>
        <h1 className='text-center mb-5'>Categories</h1>
      <div className='row gy-5 justify-content-center'>
        {
          isLoading ? (
            <div className={"p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main" }>
                <div className={`spinner-border ${styles.loader}`} role="status">
                </div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
            </div>
          ) :  errors ?(
              
            <div className='py-5  main'>
            <div className='d-flex gap-3 justify-content-center align-items-center text-danger'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
                  <path className={styles.errorIcon} fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/>
                  <path className={styles.errorIcon} fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"/>
              </svg>
              <h1>Error happened when trying to get data</h1>
      </div>
            </div>
           ) : categories.length ? (
     
          categories.map(category =>
                      <div className=' col-lg-2 col-md-3 col-sm-4 col-6' key={category._id}>

                <NavLink className='d-flex justify-content-center bg-warning py-3 rounded-5' to={`/products/category/${category._id}`}><img className='w-75' src={category.image.secure_url} alt="category image" /></NavLink>
                   </div>

            ))
            :
                <div className='d-flex justify-content-center'>
                  <h3 className='mt-5 pt-5 text-secondary'>No categories</h3>
                </div>
         } 
      </div>
    </div>
  
  )
}

export default Categories
