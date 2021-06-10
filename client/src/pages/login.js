const Login = () => {
  return (
    <div className="login-component">
      <a href={`${process.env.REACT_APP_BASE_URL}/api/auth/login`}>LOGIN</a>
    </div>
  );
};

export default Login;
