/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useErrorContext from "../hooks/UseErrors";
import useLoadingContext  from "../hooks/UseLoading";
import asyncHandler from "../utils/asyncHandler";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { withError } = useErrorContext()
  const token = localStorage.getItem("userToken");
  const { withLoading } = useLoadingContext();

  const getCart = () =>
    withLoading(
      asyncHandler(
        async () => {
          const { data } = await axios.get(`/cart`, {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          });
          if (data.message == "success") {
            setCart(data.products);
          }
        },
        withError,
        "getCart"
      ),
      "getCart"
    );

  const addToCart = asyncHandler(async (productId) => {
    const { data } = await axios.post(
      `/cart`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message == "success") {
      toast.success("product added successfully");
      getCart();
    }
  },withError , "addToCart");

  const increaseQty = asyncHandler(async (productId) => {
    const { data } = await axios.patch(
      `/cart/incraseQuantity`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message == "success") {
      toast.success("qunatity increased successfully");
      getCart();
    }
  },withError, "increaseQty");

  const decreaseQty = asyncHandler(async (productId) => {
    const { data } = await axios.patch(
      `/cart/decraseQuantity`,
      { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message == "success") {
      toast.success("qunatity decreased successfully");
      getCart();
    }
  },withError, "decreaseQty");

  const removeItem = asyncHandler(
    async (productId) => {
      const { data } = await axios.patch(
        `/cart/removeItem`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("product removed successfully");
        getCart();
      }
    },
    withError,
    "remove"
  );

  const clearCart = () =>
    withLoading(
      asyncHandler(async () => {
        const { data } = await axios.patch(
          `/cart/clear`,
          {},
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        );
        if (data.message == "success") {
          toast.success("cart cleared successfully");
          getCart();
        }
      },withError,"clear"),
      "clear"
    );

  useEffect(() => {
    if (token) getCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart: (pId) => withLoading(() => addToCart(pId), "addToCart"),
        clearCart,
        increaseQty: (pId) => withLoading(() => increaseQty(pId), "quantity"),
        decreaseQty: (pId) => withLoading(() => decreaseQty(pId), "quantity"),
        removeItem: (pId) => withLoading(() => removeItem(pId), "remove"),
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
