import { toast } from "react-toastify"

export const asyncHandler = (fn) => {
    return async (...args) => {
        try {
            await fn(...args)
        } catch (error) {
            toast.error(error.response?.data.message || "Something went wrong")
        }
    }
}