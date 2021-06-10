import { createContext } from "react";
import { useQuery } from "react-query";

import axios from "../util/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const authQueryResult = useQuery(
    "auth",
    () => axios.get("/team/profile").then((res) => res.data),
    {
      retry: false,
      staleTime: Infinity,
      //! optimise
    }
  );
  // useEffect(() => {
  //   console.log("authQueryResult", authQueryResult);
  // }, [authQueryResult]);
  const isAuth = authQueryResult.isSuccess;
  const team = authQueryResult.data;

  return (
    <AuthContext.Provider value={{ authQueryResult, isAuth, team }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
