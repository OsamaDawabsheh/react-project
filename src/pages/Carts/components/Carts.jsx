import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import useLoadingContext  from "../../../hooks/UseLoading";
import useCartContext from "../../../hooks/UseCarts";
import * as styles from "./Carts.module.css";
import useErrorContext from "../../../hooks/UseErrors";

function Carts() {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } =
    useCartContext();
  const { loading } = useLoadingContext();
  const { error } = useErrorContext();

    if (error.getCart) {
      return error.getCart;
    }

    if (loading.getCart) {
      return loading.getCart;
    }
 

  return (
    <div className="container main d-flex flex-column gap-3">
      <h1 className="text-center">Cart</h1>
     { cart.length ? (
        <>
          <div className="d-flex justify-content-between gap-3">
            <button
              className="border border-0 text-light fw-bold bg-danger px-3 py-2 rounded-5"
              onClick={clearCart}
              disabled={loading.clear ? "disabled" : ""}
            >
              {loading.clear ? (
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
              {cart.map((item) => (
                <tr key={item.productId}>
                  <td className="col-1 align-middle">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => removeItem(item.productId)}
                      disabled={loading.remove ? "disabled" : ""}
                    >
                      {loading.remove ? (
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
                      src={item.details.mainImage.secure_url}
                      className={styles.productImage}
                      alt=""
                    />
                  </td>
                  <td className="col-3 align-middle">
                    <button
                      type="submit"
                      className="border-0 rounded-5 px-2 bg-warning fw-bold"
                      disabled={
                        loading.quantity || item.quantity === 1
                          ? "disabled"
                          : ""
                      }
                      onClick={() => decreaseQty(item.productId)}
                    >
                      {" "}
                      {loading.quantity ? (
                        <div
                          className={`spinner-border bg-warning ${styles.loader}`}
                          role="status"
                        ></div>
                      ) : (
                        "-"
                      )}{" "}
                    </button>
                    <span className="mx-2">
                      {
                        cart.filter(
                          (res) => item.productId === res.productId
                        )[0].quantity
                      }
                    </span>
                    <button
                      type="submit"
                      className="border-0 rounded-5 px-2 bg-warning fw-bold"
                      disabled={loading.quantity ? "disabled" : ""}
                      onClick={() => increaseQty(item.productId)}
                    >
                      {" "}
                      {loading.quantity ? (
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
                    {item.details.finalPrice}$
                  </td>
                  <td className="col-2 align-middle">
                    {cart.filter((res) => item.productId === res.productId)[0]
                      .details
                      ? (
                          cart.filter(
                            (res) => item.productId === res.productId
                          )[0].details.finalPrice * item.quantity
                        ).toFixed(2)
                      : item.details.finalPrice * item.quantity}
                    $
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
