import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as styles from "./Products.module.css";
import { Link, NavLink } from "react-router-dom";
import UseProducts from "../../../hooks/UseProducts";

function Products() {
  const [page, setPage] = useState(1);

  const limit = 4;

  const [filter, setFilter] = useState({
    search: "",
    sort: "",
    minPrice: "",
    maxPrice: "",
  });

  const { products, isLoading, errors, numberOfPages} = UseProducts(
    filter.sort,
    filter.minPrice,
    filter.maxPrice,
    filter.serach,
    page,
    limit
  );

  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const submitFilter = async (e) => {
    e.preventDefault();
    console.log(filter);
  };

  return (
    <div className="container">
      <h1 className="text-center">Products</h1>

      {isLoading ? (
        <div
          className={
            "p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main"
          }
        >
          <div
            className={`spinner-border ${styles.loader}`}
            role="status"
          ></div>
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
      ) : (
        <>
          <div className="d-flex gap-3 flex-wrap align-items-center justify-content-between my-5 py-3 bg-primary text-light py-2 px-4">
            <form
              action=""
              onSubmit={submitFilter}
              className={`w-100 d-flex flex-wrap gap-3 justify-content-between align-items-center `}
            >
              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="sort">Sort By</label>
                  <select
                    value={filter.sort}
                    onChange={handleFilter}
                    name="sort"
                    id="sort"
                    className="p-2 px-3 rounded-5"
                  >
                    <option value="">default</option>
                    <option value="price">price</option>
                    <option value="-price">-price</option>
                    <option value="name">name</option>
                    <option value="-name">-name</option>
                    <option value="discount">discount</option>
                    <option value="-discount">-discount</option>
                  </select>
                </div>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="min price"
                  className={`px-3 py-2 rounded-5 border-0  ${styles.price}`}
                  value={filter.minPrice}
                  onChange={handleFilter}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="max price"
                  className={`px-3 py-2 rounded-5 border-0  ${styles.price}`}
                  value={filter.maxPrice}
                  onChange={handleFilter}
                />
                <input
                  type="search"
                  name="search"
                  placeholder="Search"
                  className={`px-3 py-2 border-0 rounded-5`}
                  value={filter.search}
                  onChange={handleFilter}
                />
              </div>
              <button type="submit" className={`btn btn-warning rounded-5`}>
                Filter
              </button>
            </form>
          </div>
          {products.length ? (
            <div className="row g-4 ">
              {products.map((product) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12"
                  key={product._id}
                >
                  <div
                    className={`card h-100 d-flex align-items-center ${styles.productCard}`}
                  >
                    <Link
                      className="w-100 h-100"
                      to={`/products/${product._id}`}
                    >
                      <img
                        className="card-img-top h-100 object-fit-cover "
                        src={product.mainImage.secure_url}
                        alt="product image"
                      />
                    </Link>
                    <div className="card-body w-100 text-center d-flex flex-column gap-3">
                      <h5 className="card-title ">{product.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
              {numberOfPages > 1 ? (
                <div>
                  <ul className="pagination d-flex justify-content-center mt-4">
                    <li className="page-item">
                      <Link
                        className={
                          "page-link " + (page === 1 ? "disabled" : "")
                        }
                        onClick={() => {
                          setPage(page - 1);
                        }}
                        to={`?page=${page - 1}`}
                      >
                        Previous
                      </Link>
                    </li>
                    {[
                      [...Array(numberOfPages)].map((e, i) => (
                        <li key={i} className="page-item">
                          <Link
                            className={
                              "page-link" + (page == i + 1 ? " active" : "")
                            }
                            onClick={() => {
                              setPage(i + 1);
                            }}
                            to={`?page=${i + 1}`}
                          >
                            {i + 1}
                          </Link>
                        </li>
                      )),
                    ]}

                    <li className="page-item">
                      <Link
                        className={
                          "page-link " +
                          (page === numberOfPages ? "disabled" : "")
                        }
                        onClick={() => {
                          setPage(page + 1);
                        }}
                        to={`?page=${page + 1}`}
                      >
                        Next
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="main d-flex align-items-center justify-content-center">
              <h3 className="text-secondary">No Products</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
