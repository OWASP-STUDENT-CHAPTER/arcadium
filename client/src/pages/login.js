import URL from "../util/URL";

const Login = () => {
  return (
    <div className="login-component">
      <a href={`${URL}/api/auth/login`}>LOGIN</a>
    </div>
  );
};

export default Login;
