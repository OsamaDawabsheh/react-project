import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import * as styles from './Categories.module.css'
import { NavLink } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try { 
      const { data } = await axios.get('https://ecommerce-node4.vercel.app/categories/active?limit=9');
      setCategories(data.categories);
    }
    catch {
      setError(true);
    }
    finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getCategories();
  }, []);


  if (isLoading) {
    return (<div className={'p-5 m-4 d-flex align-items-center flex-column gap-3'}>
                <div className={`spinner-border ${styles.loader}`} role="status">
                </div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
    </div>)
  }

  if (error) {
    return  <div className='py-5 bg-danger'>
            <div className='d-flex gap-3 justify-content-center align-items-center text-light'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
                  <path className={styles.errorIcon} fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/>
                  <path className={styles.errorIcon} fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"/>
              </svg>
              <h1>Error happened when trying to get data</h1>
      </div>
    </div>
  }


  return (
    <div>
      {     
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          speed={1000}
          navigation
          className={`px-3 ${styles.swiperExtensions} px-2 py-2 m-auto  rounded-5 bg-warning ${styles.swiperSlider}`}
          spaceBetween={0}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: -10
            },
            360: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 3,
            },
            580: {
              slidesPerView: 4,
            },
            700:{
              slidesPerView: 5,
            },
            840:{
              slidesPerView: 6,
            },
            1050:{
              slidesPerView: 7,
              spaceBetween: 0
            },
            1300:{
              slidesPerView: 9,
              spaceBetween: -30
            },
          }}
        >
          {
            categories.map(category =>
              <SwiperSlide key={category.id} className='d-flex justify-content-center' >
                <NavLink className='w-50' to='/Login'><img className='w-100' src={category.image.secure_url} alt="category image" /></NavLink>
              </SwiperSlide>
            )
          }

        </Swiper>
      
      }
    </div>
  )
}

export default Categories
