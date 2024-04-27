import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from "react-toastify";
import { string } from "yup";
import * as styles from './SendCode.module.css';

function SendCode() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => { 
    setEmail(e.target.value);
  }

  const dataValidation = async () => {
    
    let emailSchema = string().email().required();
    try {
      await emailSchema.validate(email, await { abortEarly: true });
      return true;
    } catch (error) {
        toast.error('please enter your email', {
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
      return false;
    }
  };  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await dataValidation();
    if (isValid) {
      setIsLoading(true);
      try {
        const { data } = await axios.patch(`/auth/sendcode`, {email})
        if (data.message === "success") {
          localStorage.setItem('email', email);
          toast.success("the code send successfly", {
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
          navigate("/forgotPassword");
        }
      } catch (error) {
        console.log(error);
        toast.error('error when trying send code', {
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
  
  }

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
          <h2 className='mt-3'>Send Code</h2>
        </div>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="email" className="ms-2 fw-bold">
              Email
            </label>
            <input
              value={email}
              onChange={handleEmailChange}
              type="email"
              name="email"
              id="email"
              className="py-2 px-3 rounded-5 border-0"
              placeholder="Enter Email"
            />
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
  )
}

export default SendCode
