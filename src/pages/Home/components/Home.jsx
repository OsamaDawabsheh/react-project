import React from 'react'
import Login from '../../Login/components/Login';
import Register from '../../Register/components/Register';
import Categories from '../../Categories/components/Categories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Link, NavLink } from 'react-router-dom';
import * as styles from './Home.module.css'
import UseCategories from '../../../hooks/UseCategories';
// import Products from '../../Products/components/Products';



function Home() {
  
  const { categories, isLoading, errors } = UseCategories();

  
  return (
    <>
 <div className='container main'>
      {     
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          speed={1000}
          navigation
          className={`px-3 ${styles.swiperExtensions} px-2 py-2 m-auto  rounded-5 bg-warning`}
          spaceBetween={0}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: -10
            },
            360: {
              slidesPerView: 2,
            },
            520: {
              slidesPerView: 3,
            },
            675: {
              slidesPerView: 4,
            },
            835:{
              slidesPerView: 5,
            },
            1000:{
              slidesPerView: 6,
            },
            1150:{
              slidesPerView: 7,
            },
            1300:{
              slidesPerView: 9,
              spaceBetween: 0
            },
          }}
        >
            {
            isLoading ?
     <div className="m-4 d-flex align-items-center flex-column gap-3">
                <div className={`spinner-border ${styles.loader}`} role="status">
                </div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
    </div>
  :   errors ?
      <div>
            <div className='d-flex gap-3 justify-content-center align-items-center text-danger'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
                  <path className={styles.errorIcon} fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/>
                  <path className={styles.errorIcon} fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"/>
              </svg>
              <h1>Error happened when trying to get data</h1>
      </div>
    </div>
  :
            categories.map(category =>
              <SwiperSlide key={category.id} className='d-flex justify-content-center' >
                <Link className='w-50' to={`/products/category/${category.id}`}><img className='w-100' src={category.image.secure_url} alt="category image" /></Link>
              </SwiperSlide>
            )
          }

        </Swiper>
        }
        
      </div>
    </>
  )
}

export default Home
