import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { object, string } from "yup";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import * as styles from "./Order.module.css";
import UseCarts from "../../../hooks/UseCarts";

function Order() {
  const [order, setOrder] = useState({
    couponName: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();
  const [orderErrors, setOrderErrors] = useState([]);
  const [orderIsLoading, setOrderIsLoading] = useState(false)

  const { products, isLoading, errors, token } = UseCarts();

  const dataValidation = async () => {
    let orderSchema = object({
      couponName: string(),
      address: string().required(),
      phone: string().required(),
    });
    try {
      await orderSchema.validate(order, await { abortEarly: false });
      setOrderErrors([]);
      return true;
    } catch (error) {
      setOrderErrors(error.errors);
      return false;
    } finally { 
      console.log(orderErrors)
    }
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await dataValidation();
    console.log(order);
    if (isValid) {
      setOrderIsLoading(true);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/order`,
          order ,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
        
        );
        console.log(data);
        if (data.message === "success") {
          toast.success("order send successfly", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          navigate('/profile');
        }
      } catch (error) {
        console.log(error);
        toast.error('error when trying send order', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setOrderIsLoading(false);
      }
    }
  };

  return (
    <div className="container ">
      <div className="row justify-content-between gy-5 ">
              <div className="col-xl-8 col-lg-7 col-md-6">
                  
                  <div className="bg-warning rounded-5 h-100 d-flex align-items-center">
                                               
            {isLoading ? (
              <div className="w-100 m-4 d-flex align-items-center flex-column gap-3">
                <div
                  className={`spinner-border ${styles.loader}`}
                  role="status"
                ></div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
              </div>
            ) : errors ? (
              <div>
                <div className="d-flex gap-3 justify-content-center align-items-center text-danger p-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100px"
                    height="100px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={styles.errorIcon}
                      fill="currentColor"
                      d="M11.001 10h2v5h-2zM11 16h2v2h-2z"
                    />
                    <path
                      className={styles.errorIcon}
                      fill="currentColor"
                      d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"
                    />
                  </svg>
                  <h1>Error happened when trying to get data</h1>
                </div>
              </div>
              ) : (
                  products.length ?
                    <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                speed={1000}
                      navigation
                className={` px-5 py-4 ${styles.swiperExtensions} w-100 h-50 bg-warning`}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 100,
                  },
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  360: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  500: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                  770: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  990: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                  >
                      {
                        products.map((product) => (
                          <SwiperSlide
                            key={product.productId}
                          >
                            <span
                              className={`bg-primary text-light rounded-5 px-1 fw-bold ${styles.price}`}
                            >
                              {product.details.price}$
                            </span>
                            <img
                              className={`w-100 h-100 ${styles.productImage}`}
                              src={product.details.mainImage.secure_url}
                              alt="category image"
                            />
                            <span
                              className={`bg-primary text-light rounded-5 px-2 fw-bold ${styles.quantity}`}
                            >
                              {product.quantity}
                            </span>
                          </SwiperSlide>
                        ))
                      }
                    </Swiper>
                    : <h1 className="w-100 d-flex align-items-center justify-content-center">Empty Cart</h1>
            )}
    </div>
    </div>

        <div
          className={` col-xl-4 col-lg-5 col-md-6`}
        >
          <form
            className=" position-relative bg-primary text-light py-5 px-3 d-flex flex-column gap-5 rounded-5 "
            action=""
            onSubmit={handleSubmit}
          >
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width={70}
              viewBox="0 0 122.9 107.5"
              className={styles.cartIcon}
            >
              <g>
                <path d="M3.9,7.9C1.8,7.9,0,6.1,0,3.9C0,1.8,1.8,0,3.9,0h10.2c0.1,0,0.3,0,0.4,0c3.6,0.1,6.8,0.8,9.5,2.5c3,1.9,5.2,4.8,6.4,9.1 c0,0.1,0,0.2,0.1,0.3l1,4H119c2.2,0,3.9,1.8,3.9,3.9c0,0.4-0.1,0.8-0.2,1.2l-10.2,41.1c-0.4,1.8-2,3-3.8,3v0H44.7 c1.4,5.2,2.8,8,4.7,9.3c2.3,1.5,6.3,1.6,13,1.5h0.1v0h45.2c2.2,0,3.9,1.8,3.9,3.9c0,2.2-1.8,3.9-3.9,3.9H62.5v0 c-8.3,0.1-13.4-0.1-17.5-2.8c-4.2-2.8-6.4-7.6-8.6-16.3l0,0L23,13.9c0-0.1,0-0.1-0.1-0.2c-0.6-2.2-1.6-3.7-3-4.5 c-1.4-0.9-3.3-1.3-5.5-1.3c-0.1,0-0.2,0-0.3,0H3.9L3.9,7.9z M96,88.3c5.3,0,9.6,4.3,9.6,9.6c0,5.3-4.3,9.6-9.6,9.6 c-5.3,0-9.6-4.3-9.6-9.6C86.4,92.6,90.7,88.3,96,88.3L96,88.3z M53.9,88.3c5.3,0,9.6,4.3,9.6,9.6c0,5.3-4.3,9.6-9.6,9.6 c-5.3,0-9.6-4.3-9.6-9.6C44.3,92.6,48.6,88.3,53.9,88.3L53.9,88.3z M33.7,23.7l8.9,33.5h63.1l8.3-33.5H33.7L33.7,23.7z" />
              </g>
            </svg>

            <div className="text-center">
              <h2>Order</h2>
            </div>
            <div className="d-flex flex-column gap-4">
              <ul
                className={
                  orderErrors.length > 0
                    ? "bg-danger py-2 m-0 fw-bold rounded-5"
                    : "d-none"
                }
              >
                {orderErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <div className="d-flex flex-column gap-2">
                <label htmlFor="coupon" className="ms-2 fw-bold">
                  Coupon
                </label>
                <input
                  value={order.couponName}
                  onChange={handleOrderChange}
                  type="text"
                  name="couponName"
                  id="coupon"
                  className="py-2 px-3 rounded-5 border-0"
                  placeholder="Enter coupon"
                />
              </div>
              <div className="d-flex flex-column gap-2">
                <label htmlFor="address" className="ms-2 fw-bold">
                  Address
                </label>
                <input
                  value={order.address}
                  onChange={handleOrderChange}
                  type="text"
                  name="address"
                  id="address"
                  className="py-2 px-3 rounded-5 border-0"
                  placeholder="Enter address"
                />
              </div>
              <div className="d-flex flex-column gap-2 position-relative">
                <label htmlFor="phone" className="ms-2 fw-bold">
                  Phone
                </label>
                <input
                  type="tel"
                  value={order.phone}
                  onChange={handleOrderChange}
                  name="phone"
                  id="phone"
                  className="py-2 px-3 rounded-5 border-0 "
                  placeholder="Enter phone"
                />
              </div>
            </div>
            <button
              type="submit"
              className="border-0 rounded-5 py-2 bg-warning fw-bold"
              disabled={orderIsLoading ?? "disabled"}
            >
              {orderIsLoading ? (
                <div className="spinner-border" role="status"></div>
              ) : (
                "Send"
              )}{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Order;
