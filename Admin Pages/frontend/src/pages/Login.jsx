import { Link } from "react-router-dom";
import imageSrc from '../images/facebook_profile_image.png';
function Login() {
  return (
    <div className="login-dark">
      <form method="post">
      <div className="illustration ">
          <img src={imageSrc} alt="LOGO" style={{height:"120px"}} />
        </div>
        <div className="form-group">
          <label htmlFor="Employee Id">Employee ID:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Employee Id"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <Link to={"/dashboard"}>
            <button className="btn btn-primary btn-block">Log In</button>
          </Link>
        </div>
        <a href="#" className="forgot">
          Forgot your email or password?
        </a>
      </form>
    </div>
  );
}

export default Login;
