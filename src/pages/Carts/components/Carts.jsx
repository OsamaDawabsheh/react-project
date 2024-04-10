import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import UseCarts from "../../../hooks/UseCarts";
import * as styles from "./Carts.module.css";

function Carts() {
  const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);
  const [isClearing, setIsClearinging] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const { products, isLoading, errors, token } = UseCarts();

  const increaseQuantity = async (id) => {
    setIsLoadingQuantity(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("product's count increased successfully", {
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
        console.log(data);
      }
    } catch (error) {
      toast.error("error when trying update product's count", {
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
      setIsLoadingQuantity(false);
    }
  };

  const decreaseQuantity = async (id) => {
    setIsLoadingQuantity(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("product's count decreased successfully", {
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
        console.log(data);
      }
    } catch (error) {
      toast.error(error.response.data.message, {
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
      setIsLoadingQuantity(false);
    }
  };

  const removeProduct = async (id) => {
    setIsRemoving(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId: id },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("product removed successfly", {
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
      }
    } catch (error) {
      toast.error("error when trying remove product", {
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
      setIsRemoving(false);
    }
  };

  const clearCart = async () => {
    setIsClearinging(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message === "success") {
        toast.success("cart cleared successfully", {
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
      }
    } catch (error) {
      toast.error(error.response.data.message, {
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
      setIsClearinging(false);
    }
  };

  return (
    <div className="container main d-flex flex-column gap-3">
      <h1 className="text-center">Cart</h1>

      {isLoading ? (
        <div
          className={
            "p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main"
          }
        >
          <div className={`spinner-border`} role="status"></div>
          <span className="sr-only fs-5 fw-bold">Loading...</span>
        </div>
      ) : errors ? (
        <div className="py-5  main">
          <div className="d-flex gap-3 justify-content-center align-items-center text-danger">
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
      ) : products.length ? (
        <>
          <div className="d-flex justify-content-between gap-3">
            <button
              className="border border-0 text-light fw-bold bg-danger px-3 py-2 rounded-5"
              onClick={clearCart}
              disabled={isClearing ? "disabled" : ""}
            >
              {isClearing ? (
                <div
                  className={`spinner-border ${styles.loader}`}
                  role="status"
                ></div>
              ) : (
                "Clear Carts"
              )}
            </button>
            <Link
              className="text-decoration-none text-dark fw-bold bg-warning px-3 py-2 rounded-5 "
              to={"/order"}
            >
              Check Out
            </Link>
          </div>
          <table className="table table-bordered border-primary border-5  table-hover text-center">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">product image</th>
                <th scope="col">quantity</th>
                <th scope="col">price</th>
                <th scope="col">total</th>
              </tr>
            </thead>
            <tbody className="fw-bold">
              {products.map((product) => (
                <tr key={product.productId}>
                  <td className="col-1 align-middle">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => removeProduct(product.productId)}
                      disabled={isRemoving ? "disabled" : ""}
                    >
                      {isRemoving ? (
                        <div
                          className={`spinner-border ${styles.loader}`}
                          role="status"
                        ></div>
                      ) : (
                        <svg
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="#dc3545"
                        >
                          <title>Remove</title>
                          <path d="M4 10v20c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2v-20h-22zM10 28h-2v-14h2v14zM14 28h-2v-14h2v14zM18 28h-2v-14h2v14zM22 28h-2v-14h2v14z"></path>
                          <path d="M26.5 4h-6.5v-2.5c0-0.825-0.675-1.5-1.5-1.5h-7c-0.825 0-1.5 0.675-1.5 1.5v2.5h-6.5c-0.825 0-1.5 0.675-1.5 1.5v2.5h26v-2.5c0-0.825-0.675-1.5-1.5-1.5zM18 4h-6v-1.975h6v1.975z"></path>
                        </svg>
                      )}
                    </button>
                  </td>
                  <td className="col-4 align-middle">
                    <img
                      src={product.details.mainImage.secure_url}
                      className={styles.productImage}
                      alt=""
                    />
                  </td>
                  <td className="col-3 align-middle">
                    <button
                      type="submit"
                      className="border-0 rounded-5 px-2 bg-warning fw-bold"
                      disabled={
                        isLoadingQuantity || product.quantity === 1
                          ? "disabled"
                          : ""
                      }
                      onClick={() => decreaseQuantity(product.productId)}
                    >
                      {" "}
                      {isLoadingQuantity ? (
                        <div
                          className={`spinner-border bg-warning ${styles.loader}`}
                          role="status"
                        ></div>
                      ) : (
                        "-"
                      )}{" "}
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      type="submit"
                      className="border-0 rounded-5 px-2 bg-warning fw-bold"
                      disabled={isLoadingQuantity ? "disabled" : ""}
                      onClick={() => increaseQuantity(product.productId)}
                    >
                      {" "}
                      {isLoadingQuantity ? (
                        <div
                          className={`spinner-border bg-warning ${styles.loader}`}
                          role="status"
                        ></div>
                      ) : (
                        "+"
                      )}{" "}
                    </button>
                  </td>
                  <td className="col-2 align-middle">
                    {product.details.price}$
                  </td>
                  <td className="col-2 align-middle">
                    {product.quantity * product.details.price}$
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <h3 className="mt-5 pt-5 text-secondary">No Products</h3>
        </div>
      )}
    </div>
  );
}

export default Carts;
