import { toast } from "react-toastify"
const asyncHandler =  (fn, withError , key) => {
  return async (...args) => {
        try {
            await fn(...args)
        } catch (error) {
            withError(
              [key],

           error.response.data.message
            );
                  }
    }
}

export default asyncHandler;