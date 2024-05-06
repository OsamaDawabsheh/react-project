import axios from "axios";
import { useEffect, useState } from "react";
import asyncHandler from "../utils/asyncHandler";
import useErrorContext from "./UseErrors";
import useLoadingContext from "./UseLoading";

function UseCategories() {
  const { loading, withLoading } = useLoadingContext();
  const { error, withError } = useErrorContext();
  const [categories, setCategories] = useState([]);

  const getCategories = () =>
    withLoading(
      asyncHandler(
        async () => {
          const { data } = await axios.get(`/categories/active?limit=9`);
          if (data.message == "success") {
            setCategories(data.categories);
          }
        },
        withError,
        'getCategories'
      ),
      "getCategories"
    );

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading, error };
}

export default UseCategories;
