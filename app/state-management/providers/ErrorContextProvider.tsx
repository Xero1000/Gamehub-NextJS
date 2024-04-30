import { PropsWithChildren, useState } from "react";
import errorContext from "../contexts/errorContext";

// Provider to provide error-related context to child components
const ErrorContextProvider = ({ children }: PropsWithChildren) => {
  const [errorOccured, setErrorOccured] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <errorContext.Provider
      value={{ errorOccured, setErrorOccured, message, setMessage }}
    >
      {children}
    </errorContext.Provider>
  );
};

export default ErrorContextProvider;
