import axios from "axios";
import React, { useEffect, useState } from "react";
import useErrorContext from "../../../hooks/UseErrors";
import useLoadingContext from "../../../hooks/UseLoading";
import asyncHandler from "../../../utils/asyncHandler";
import * as styles from "./Information.module.css";

function Information() {
  const { error, withError } = useErrorContext();
  const { loading, withLoading } = useLoadingContext();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("userToken");

  const getInfo = async () => {
     withLoading(asyncHandler (async () => {
        const { data } = await axios.get(
        `/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setUser(data.user);
     },withError , "getInfo") , "getInfo");
  };
   

  useEffect(() => {
    getInfo();
  }, []);

   if (error.getInfo) {
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
           <h1>{error.getInfo}</h1>
         </div>
       </div>
     );
   }

  if (loading.getInfo) return loading.getInfo;

  return (
      <div className=" py-5">
            { loading.getInfo ?
  <div className={"p-5 m-4 d-flex align-items-center justify-content-center flex-column gap-3 main" }>
                <div className={`spinner-border ${styles.loader}`} role="status">
                </div>
                <span className="sr-only fs-5 fw-bold">Loading...</span>
              </div>
              :
              loading.getInfo ?
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
        <table className="table table-bordered border-primary  table-hover text-center">
          <thead>
            <tr>
              {user.image ? (
                <th scope="col" className="align-middle">
                  <img
                    src={user.image.secure_url}
                    alt="user Image"
                    className={`${styles.userImage}`}
                  />
                </th>
              ) : (
                <th></th>
              )}
              <th scope="col" className="align-middle">
                user information
              </th>
            </tr>
          </thead>
          <tbody className="fw-bold">
            <tr>
              <th> Name</th>
              <td className="text-primary">{user.userName}</td>
            </tr>
            <tr>
              <th> Email</th>
              <td className="text-primary">{user.email}</td>
            </tr>
            <tr>
              <th> Created Date</th>
              {user.createdAt ? (
                <td className="text-primary">{user.createdAt.split("T")[0]}</td>
              ) : (
                <td></td>
              )}
            </tr>

          </tbody>
        </table>
}
    </div>
  );
}

export default Information;
