import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { object, string } from "yup";
import * as styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const [user, setUser] = useState({
    email: localStorage.getItem('email'),
    code: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const dataValidation = async () => {
    let userSchema = object({
      code: string().required(),
      password: string().required().min(5),
    });
    try {
      await userSchema.validate(user, await { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      setErrors(error.errors);
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
    console.log(user);
    if (isValid) {
      setIsLoading(true);
      try {
        const { data } = await axios.patch(
          `/auth/forgotPassword`,
          user
        );
        console.log(data);
        if (data.message === "success") {
          toast.success("the password changed successfly", {
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
          localStorage.removeItem("email");
          localStorage.removeItem("changePassword");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
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
        setIsLoading(false);
      }
    }
  };


  return (
    <div
      className={`container row mx-auto justify-content-center align-items-center h-100 ${styles.yMargin}`}
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
          <h2>Change Password</h2>
        </div>
        <div className="d-flex flex-column gap-4">
          <ul
            className={
              errors.length !== 0
                ? "bg-danger py-2 m-0 fw-bold rounded-5"
                : "d-none"
            }
          >
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="code" className="ms-2 fw-bold">
              Code
            </label>
            <input
              value={user.code}
              onChange={handleUserChange}
              type="text"
              name="code"
              id="code"
              className="py-2 px-3 rounded-5 border-0"
              placeholder="Enter Code"
            />
          </div>
          <div className="d-flex flex-column gap-2 position-relative">
            <label htmlFor="password" className="ms-2 fw-bold">
              New Password
            </label>
            <div className="position-relative">
            <input
              type={showPassword ? "password" : "text"}
              value={user.password}
              onChange={handleUserChange}
              name="password"
              id="password"
              className="py-2 px-3 rounded-5 border-0 w-100"
              placeholder="Enter New Password"
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
          </div>
        </div>
        <button
          type="submit"
          className="border-0 rounded-5 py-2 bg-warning fw-bold"
          disabled={isLoading ?? "disabled"}
        >
          {isLoading ? (
            <div className="spinner-border" role="status"></div>
          ) : (
            "Send"
          )}{" "}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
