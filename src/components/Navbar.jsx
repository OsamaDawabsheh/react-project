import React from "react";
import { useContext } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { CartContext } from "../context/Cart";
import * as styles from "./Navbar.module.css";

function Navbar() {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();
  const {count} = useContext(CartContext);

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-primary mb-5">
        <div className="container d-flex align-items-baseline">
          <NavLink className="navbar-brand text-warning fw-bold me-5" to="/">
            OSAMA
          </NavLink>
          <button
            className="navbar-toggler border border-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item d-flex gap-1">
                <NavLink className="nav-link" to="/carts">
                  Carts
                </NavLink>
                {token ?
                <span className="d-flex bg-warning h-50 px-1 fw-bold align-items-center rounded-5">{count}</span>
                  : ""
              }
              </li>
            </ul>
            <div className="auth d-flex justify-content-center gap-3 ">
              {!token ? (
                <>
                  <Link
                    className="bg-warning py-2 px-4 rounded-5 text-dark fw-bold text-decoration-none"
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="bg-warning py-2 px-3 rounded-5 text-dark fw-bold text-decoration-none"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-warning dropdown-toggle fw-bold"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item fw-bold fs-6 " to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                                          <li>
                                                                  <button
                      className='dropdown-item fw-bold'
                      onClick={logout}
                    >
                      Log out
                    </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
