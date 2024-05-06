/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ErrorContext = createContext(null);

const Error = ({ children }) => {
  const [error, setError] = useState({});

  const withError = (key , error = 'something went error') => {
		setError((prev) => ({
      ...prev,
      [key]: error,
    }));
  }
  console.log(error);
  return (
    <ErrorContext.Provider
      value={{
        error,
        withError,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default Error;
