import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
      <>
        <nav className="navbar navbar-expand-lg bg-primary mb-5">
            <div className="container d-flex align-items-baseline">
                <NavLink className="navbar-brand text-warning fw-bold me-5" to="/">Navbar</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <NavLink className="nav-link"  aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to="/carts">Carts</NavLink>
                        </li>

                    </ul>
                    <div className="auth d-flex justify-content-center gap-3 ">
                            <NavLink className="bg-warning py-2 px-4 rounded-5 text-dark fw-bold text-decoration-none" to="/login">Login</NavLink>
                            <NavLink className="bg-warning py-2 px-3 rounded-5 text-dark fw-bold text-decoration-none" to="/register">Sign Up</NavLink>                          
                    </div>
                </div>
            </div>
        </nav>

      </>


  )
}

export default Navbar
