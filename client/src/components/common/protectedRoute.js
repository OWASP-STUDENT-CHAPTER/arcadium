import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import '../../assets/css/Loading.css';
import Loader from '../../assets/img/hero-preloaders.svg';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authQueryResult: { isError, isLoading },
  } = useContext(AuthContext);

  if (isError) return <Redirect to='/' />;
  if (isLoading)
    return (
      <div className='loading'>
        <img src={Loader} alt='' />
      </div>
    );

  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export default ProtectedRoute;
