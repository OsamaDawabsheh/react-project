import axios from "axios";
import React, { useEffect, useState } from "react";
import useErrorContext from "../../../hooks/UseErrors";
import useLoadingContext from "../../../hooks/UseLoading";
import asyncHandler from "../../../utils/asyncHandler";
import * as styles from "./Orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");
  const [products, setProducts] = useState([]);
  const { loading, withLoading } = useLoadingContext();
  const { error, withError } = useErrorContext();

  const getOrders = async () => {
    let products = [];
    withLoading(asyncHandler (async () => {
         const { data } = await axios.get(
        `/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
        setOrders(data.orders);
      data.orders.map((order) =>
          order.products.map((product) => products.push(product))
      );
      setProducts(products);
     },withError , "getOrders") , "getOrders");
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (error.getOrders) {
    return (
      <div className="py-5  main">
        <div className="d-flex gap-3 justify-content-center align-items-center text-danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="100px"
            viewBox="0 0 24 24"
          >
            <path
              className="errorIcon"
              fill="currentColor"
              d="M11.001 10h2v5h-2zM11 16h2v2h-2z"
            />
            <path
              className="errorIcon"
              fill="currentColor"
              d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"
            />
          </svg>
          <h1>{error.getOrders}</h1>
        </div>
      </div>
    );
  }

  if (loading.getOrders) return loading.getOrders;

  return (
    <div className="py-5">
      {products ? (
        <table className="table table-bordered border-primary border-5  table-hover text-center">
          <thead>
            <tr>
              <th scope="col" className="align-middle">
                status
              </th>
              <th scope="col" className="align-middle">
                order date
              </th>
              <th scope="col" className="align-middle">
                image
              </th>
              <th scope="col" className="align-middle">
                quantity
              </th>
              <th scope="col" className="align-middle">
                final price
              </th>
            </tr>
          </thead>
          <tbody className="fw-bold">
            {orders.map(
              (order) => (
                order.products.map((product) => (
                  <tr key={product.productId._id} className="text-light">
                    <td className="col-1 align-middle">{order.status}</td>
                    <td className="col-2 align-middle">
                      {order.updatedAt.split("T")[0]}
                    </td>
                    <td className="col-3 align-middle">
                      <img
                        src={product.productId.mainImage.secure_url}
                        className={`w-50`}
                        alt=""
                      />
                    </td>

                    <td className="col-1 align-middle">
                      <span className="mx-2">{product.quantity}</span>
                    </td>
                    <td className="col-1 align-middle">
                      {product.finalPrice.toFixed(2)}$
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      ) : (
        <div className="d-flex justify-content-center">
          <h3 className="text-secondary">No Products</h3>
        </div>
      )}
    </div>
  );
}

export default Orders;
