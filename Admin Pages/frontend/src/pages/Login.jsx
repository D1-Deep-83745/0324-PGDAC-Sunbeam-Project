import { Link } from "react-router-dom";

function Login() {
  return (
    <div class="login-dark">
      <div className="title">
        <p>Grantha-Vihara </p>
        <p style={{ fontSize: "30px" }}>Admin Login</p>
      </div>
      <form method="post">
        <div class="illustration">
          <div className="logocontainer">
            
          </div>
          <i class="icon ion-ios-locked-outline"></i>
        </div>
        <div class="form-group">
          <label htmlFor="Employee Id">Employee ID:</label>
          <input
            class="form-control"
            type="email"
            name="email"
            placeholder="Employee Id"
          />
        </div>
        <div class="form-group">
          <label htmlFor="password">Password:</label>
          <input
            class="form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <Link to={"/dashboard"}>
            <button class="btn btn-primary btn-block">Log In</button>
          </Link>
        </div>
        <a href="#" class="forgot">
          Forgot your email or password?
        </a>
      </form>
    </div>
  );
}

export default Login;
