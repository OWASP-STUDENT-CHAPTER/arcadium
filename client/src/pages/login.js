import URL from '../util/URL';
import '../assets/css/Login.css';

const Login = () => {
  return (
    <div className='login-component'>
      <div className='wrapper'>
        <form>
          <label className='off label'>
            Click on the switch to <span>Login!</span>
          </label>
          <a href={`${URL}/api/auth/login`}>
            <div className='switch-wrapper'>
              <div className='switch-overlay'></div>
              <div className='switch-top'>
                <input
                  type='checkbox'
                  name='switch'
                  className='button'
                  checked='checked'
                />
              </div>
              <div className='light on'></div>
              <div className='light-off off'></div>
              <div className='switch-bottom'></div>
            </div>
          </a>
          <label className='on switch-on label'></label>
        </form>
      </div>
    </div>
  );
};

export default Login;
