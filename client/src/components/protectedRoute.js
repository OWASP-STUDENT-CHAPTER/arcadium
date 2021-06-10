import { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authQueryResult: { isError, isLoading },
  } = useContext(AuthContext);

  if (isError) return <Redirect to="/" />;
  if (isLoading) return <h1>LOADING...</h1>;
  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default ProtectedRoute;
