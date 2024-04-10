import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as styles from "./Orders.module.css";

function Orders() {
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("userToken");
  const [products, setProducts] = useState([]);

  const getOrders = async () => {
    setIsLoading(true);
    let products = [];
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
        setOrders(data.orders);
          console.log(data.orders);
      data.orders.map((order) =>
          order.products.map((product) => products.push(product))
      );
      setProducts(products);
    } catch (error) {
      setErrors(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
      <div className=" py-5">
          {isLoading ? 
              <div className={"p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main" }>
                <div className={`spinner-border ${styles.loader}`} role="status">
                </div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
              </div>
              :
              errors ?
                  <div className='py-5  main'>
            <div className='d-flex gap-3 justify-content-center align-items-center text-danger'>
              <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
                  <path className={styles.errorIcon} fill="currentColor" d="M11.001 10h2v5h-2zM11 16h2v2h-2z"/>
                  <path className={styles.errorIcon} fill="currentColor" d="M13.768 4.2C13.42 3.545 12.742 3.138 12 3.138s-1.42.407-1.768 1.063L2.894 18.064a1.986 1.986 0 0 0 .054 1.968A1.984 1.984 0 0 0 4.661 21h14.678c.708 0 1.349-.362 1.714-.968a1.989 1.989 0 0 0 .054-1.968L13.768 4.2zM4.661 19L12 5.137L19.344 19H4.661z"/>
              </svg>
              <h1>Error happened when trying to get data</h1>
      </div>
                  </div>
                  :
      products ? (
        <table className="table table-bordered border-primary border-5  table-hover text-center">
          <thead>
            <tr>
              <th scope="col" className="align-middle">status</th>
              <th scope="col" className="align-middle">order date</th>
              <th scope="col" className="align-middle">image</th>
              <th scope="col" className="align-middle">quantity</th>
              <th scope="col" className="align-middle">final price</th>
            </tr>
          </thead>
          <tbody className="fw-bold">
                              {
                                  orders.map((order) => (
                                                                    
                                              console.log(order.status),
                                      order.products.map((product) => (
                                          <tr key={product.productId._id} className='text-light' >
                                              <td className="col-1 align-middle">{order.status}</td>
                                              <td className="col-2 align-middle">{order.updatedAt.split("T")[0]}</td>
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
                                              <td className="col-1 align-middle">{product.finalPrice.toFixed(2)}$</td>
                                          </tr>
                                      ) )))}
          </tbody>
        </table>
      ) : (
        "No products"
      )}
    </div>
  );
}

export default Orders;
