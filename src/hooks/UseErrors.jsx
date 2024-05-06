import { useContext } from "react";
import { ErrorContext } from "../context/Errors";

const useErrorContext = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useErrorContext must be used within a ErrorProvider");
  }
  return context;
};

export default useErrorContext;
