import axios from "axios";
import React, { useState,useEffect, useRef } from "react";
import { object, string } from 'yup';
import { toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as styles from "./Register.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import userImage from "../../../assets/userImage.png"

function Register() {

  const fileRef = useRef(null)


  
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(true);
  const [isuploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  const dataValidation = async () => {
    let userSchema = object({
      userName: string().required(),
      email: string().email(),
      password: string().min(5),
    });
    try{
      await userSchema.validate(user, await { abortEarly: false });
      setErrors([]);
      return true;
    } catch (error) {
      setErrors(error.errors);
      return false;
    }

  }

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: files[0] });
    setIsUploading(true);
  }

  const handleSubmit = async (e) => { 
    e.preventDefault();
    const isValid = await dataValidation();
    if (isValid) { 
      setIsLoading(true);
      console.log(user);
      
      // default uploaded image 
  const response = await fetch(userImage);
      const blob = await response.blob();
            const file = new File([blob], 'userImage.png', { type: blob.type });



      const formData = new FormData();
      formData.append('userName', user.userName);
      formData.append('email', user.email);
      formData.append('password', user.password);
      user.image ? 
        formData.append('image', user.image)
        :
        formData.append('image', file);

      

      try { 
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
        console.log(data);
        if (data.message === 'success') {
          toast.success('the account is created successfly', {
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
          navigate('/login')
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
  }


  return (
    <div
      className={`container row m-auto justify-content-center align-items-center h-100`}
    >
      <form
        className="position-relative bg-primary text-light py-5 px-3 d-flex flex-column gap-4 rounded-5 col-xl-4 col-lg-5 col-md-7 col-sm-9 col-12"
        action=""
        onSubmit={handleSubmit}
      >
        {
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
        }


        <div className="text-center">
          <h2>SignUp</h2>
        </div>
        <div className="d-flex flex-column gap-3">
          <ul className={ errors.length !== 0 ?'bg-danger py-2 m-0 fw-bold rounded-5':'d-none'}>
            {
              errors.map((error,index) => 
                <li key={index}>{error}</li>
            )
          }
          </ul>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="userName" className="ms-2 fw-bold">
              userName
            </label>
            <input
              value={user.userName}
              onChange={handleUserChange}
              type="text"
              name="userName"
              id="userName"
              className="py-2 px-3 rounded-5 border-0"
              placeholder="Enter userName"
            />
          </div>          
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
            <input
              type={showPassword ? "password" : "text"}
              value={user.password}
              onChange={handleUserChange}
              name="password"
              id="password"
              className="py-2 px-3 rounded-5 border-0"
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
          <div className="d-flex flex-column gap-2">
            <div
              className={`d-flex justify-content-center align-items-center gap-3 p-2  ${styles.uploadFile}`}
              onClick={()=>fileRef.current.click()}
            >
              <input
                type="file"
                name="image"
                id="image"
                ref={fileRef}
                className="d-none"
                onChange={handleImageChange} 
              />
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 32 32"
                fill="white"
              >
                <title></title>
                <path d="M15 16l-3.25 3.25-0.75-0.75 4.5-4.5 4.5 4.5-0.75 0.75-3.25-3.25v11h-1v-11zM14 21h-6.997c-2.205 0-4.003-1.791-4.003-4 0-1.895 1.325-3.488 3.101-3.898v0c-0.066-0.357-0.101-0.726-0.101-1.102 0-3.314 2.686-6 6-6 2.615 0 4.84 1.673 5.661 4.008 0.774-0.63 1.762-1.008 2.839-1.008 2.358 0 4.293 1.814 4.484 4.123v0c1.73 0.44 3.016 2.009 3.016 3.877 0 2.205-1.792 4-4.003 4h-6.997v1h7.001c2.761 0 4.999-2.244 4.999-5 0-2.096-1.287-3.892-3.117-4.634v0c-0.523-2.493-2.734-4.366-5.383-4.366-0.863 0-1.679 0.199-2.406 0.553-1.203-2.121-3.481-3.553-6.094-3.553-3.866 0-7 3.134-7 7 0 0.138 0.004 0.275 0.012 0.412v0c-1.772 0.77-3.012 2.538-3.012 4.588 0 2.761 2.232 5 4.999 5h7.001v-1z"></path>
              </svg>
              <h6 className="user-select-none text-truncate">{ isuploading ? user.image.name : "upload your image"}</h6>
            </div>
          </div>
        </div>

        <button type="submit" className='border-0 rounded-5 py-2 bg-warning fw-bold' disabled={isLoading ?? 'disabled'}>

          {
              isLoading?
                <div className="spinner-border" role="status">
              </div>
              :'Sign Up'
  }

          
        </button>
      </form>
    </div>
  );
}

export default Register;
