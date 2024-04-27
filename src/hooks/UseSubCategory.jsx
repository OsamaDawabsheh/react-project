import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UseSubCategory() {
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [subCategory, setSubCategory] = useState([]);
    const { id } = useParams();


const getSubCategories = async () => {
        
    setIsLoading(true);
    try { 
      const { data } = await axios.get(`/categories/${id}/subcategory`);
        setSubCategory(data.subcategory);
        console.log(data);
    }
    catch(error){
        setErrors(true);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSubCategories();
  }, []);


  return {subCategory , isLoading , errors}
}

export default UseSubCategory
