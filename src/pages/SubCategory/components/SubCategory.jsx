import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

// import * as styles from './Categories.module.css'
import { NavLink, useParams } from 'react-router-dom';
import UseSubCategory from '../../../hooks/UseSubCategory';

function SubCategory() {

  const { subCategory, isLoading, errors } = UseSubCategory();


  return (
  <div className='container main'>
   
    </div>
  )
}

export default SubCategory
