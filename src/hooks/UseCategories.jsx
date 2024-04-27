import axios from 'axios';
import { useEffect, useState } from 'react';

function UseCategories() {
    const [errors, setErrors] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [categories, setCategories] = useState([]);


const getCategories = async () => {
        
    setIsLoading(true);
    try { 
      const { data } = await axios.get(`/categories/active?limit=9`);
        setCategories(data.categories);
    }
    catch(error){
        setErrors(true);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);


  return {categories , isLoading , errors}
}

export default UseCategories
