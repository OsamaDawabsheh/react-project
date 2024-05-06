import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { object, string } from "yup";
import useErrorContext from "../../../hooks/UseErrors";
import useLoadingContext from "../../../hooks/UseLoading";
import asyncHandler from "../../../utils/asyncHandler";
import * as styles from "./Login.module.css";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [loginErrors, setLoginErrors] = useState([]);
  const { loading, withLoading } = useLoadingContext();
  const { error, withError } = useErrorContext();
  const navigate = useNavigate();

  const dataValidation = async () => {
    let userSchema = object({
      email: string().email().required(),
      password: string().required(),
    });
    try {
      await userSchema.validate(user, await { abortEarly: false });
      setLoginErrors([]);
      return true;
    } catch (error) {
      setLoginErrors(error.errors);
      return false;
    }
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await dataValidation();
    if (isValid) {
      withLoading( asyncHandler(async () => {
        const { data } = await axios.post(
          `/auth/signin`,
          user
        );
        if (data.message === "success") {
          localStorage.setItem("userToken", data.token);
          toast.success("you entered successfly");
          navigate("/");
        }
      }, withError, "login"), "login");
      
    }
          if (error.login) {
            toast.error(error.login);
          }
  };

  
  const sendCode = () => {
    localStorage.setItem('changePassword', true);
    navigate("/sendCode");
}
  
  // useEffect(() => {
  //   if (error.login) {
  //       toast.error(error.login);
  //     }
  // },[user])



    return (
      <div
        className={`container row m-auto justify-content-center align-items-center h-100`}
      >
        <form
          className="position-relative bg-primary text-light py-5 px-3 d-flex flex-column gap-5 rounded-5 col-xl-4 col-lg-5 col-md-7 col-sm-9 col-12"
          action=""
          onSubmit={handleSubmit}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            viewBox="0 0 28 28"
            className={styles.userIcon}
          >
            <title>user-icon</title>
            <path d="M14 0c7.734 0 14 6.266 14 14 0 7.688-6.234 14-14 14-7.75 0-14-6.297-14-14 0-7.734 6.266-14 14-14zM23.672 21.109c1.453-2 2.328-4.453 2.328-7.109 0-6.609-5.391-12-12-12s-12 5.391-12 12c0 2.656 0.875 5.109 2.328 7.109 0.562-2.797 1.922-5.109 4.781-5.109 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c2.859 0 4.219 2.312 4.781 5.109zM20 11c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6z"></path>
          </svg>

          <div className="text-center">
            <h2>Login</h2>
          </div>
          <div className="d-flex flex-column gap-4">
            <ul
              className={
                loginErrors.length !== 0
                  ? "bg-danger py-2 m-0 fw-bold rounded-5"
                  : "d-none"
              }
            >
              {loginErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <div className="d-flex flex-column gap-2">
              <label htmlFor="email" className="ms-2 fw-bold">
                Email
              </label>
              <input
                value={user.email}
                onChange={handleUserChange}
                type="email"
                name="email"
                id="email"
                className="py-2 px-3 rounded-5 border-0"
                placeholder="Enter Email"
              />
            </div>
            <div className="d-flex flex-column gap-2 position-relative">
              <label htmlFor="password" className="ms-2 fw-bold">
                Password
              </label>
              <div className="position-relative">
                <input
                  type={showPassword ? "password" : "text"}
                  value={user.password}
                  onChange={handleUserChange}
                  name="password"
                  id="password"
                  className="py-2 px-3 rounded-5 border-0 w-100"
                  placeholder="Enter Password"
                />
                {showPassword ? (
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword(false)}
                  >
                    <title>hide password</title>
                    <path d="M12.81 4.36l-1.77 1.78c-0.311-0.087-0.668-0.137-1.037-0.137-2.209 0-4 1.791-4 4 0 0.369 0.050 0.726 0.143 1.065l-0.007-0.028-2.76 2.75c-1.32-1-2.42-2.3-3.18-3.79 1.86-3.591 5.548-6.003 9.799-6.003 0.996 0 1.96 0.132 2.878 0.38l-0.077-0.018zM16.61 6.21c1.33 1 2.43 2.3 3.2 3.79-1.859 3.594-5.549 6.007-9.802 6.007-1.002 0-1.973-0.134-2.895-0.385l0.077 0.018 1.77-1.78c0.311 0.087 0.668 0.137 1.037 0.137 2.209 0 4-1.791 4-4 0-0.369-0.050-0.726-0.143-1.065l0.007 0.028 2.76-2.75zM16.36 2.22l1.42 1.42-14.14 14.14-1.42-1.42 14.14-14.14z"></path>
                  </svg>
                ) : (
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    className={styles.eyeIcon}
                    onClick={() => setShowPassword(true)}
                  >
                    <title>show password</title>
                    <path d="M0.2 10c1.86-3.592 5.548-6.004 9.8-6.004s7.94 2.412 9.771 5.943l0.029 0.061c-1.86 3.592-5.548 6.004-9.8 6.004s-7.94-2.412-9.771-5.943l-0.029-0.061zM10 14c2.209 0 4-1.791 4-4s-1.791-4-4-4v0c-2.209 0-4 1.791-4 4s1.791 4 4 4v0zM10 12c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0z" />
                  </svg>
                )}
              </div>
              <Link
                className={`text-light text-center fw-bold ${styles.forgot}`}
                onClick={sendCode}
              >
                Forgot Password
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="border-0 rounded-5 py-2 bg-warning fw-bold"
            disabled={loading.login ? "disabled" : ""}
          >
            {loading.login ? (
              <div className="spinner-border" role="status"></div>
            ) : (
              "Sign In"
            )}{" "}
          </button>
        </form>
      </div>
    );
  }

export default Login;
