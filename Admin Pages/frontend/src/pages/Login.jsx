import { useNavigate } from "react-router-dom";
import imageSrc from '../images/facebook_profile_image.png';
import { useState } from "react";
import { toast } from "react-toastify";
import login from "../service/user";





function Login() {
   
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    
    const navigate = useNavigate()

    const onLogin = async (e) => {
        e.preventDefault();
       if (email.length === 0) {
      toast.warning('enter email')
    }else if (password.length === 0) {
      toast.warning('enter password')
    }else {
      const result = await login(email, password)
      if (result['status'] === 'success') {
        toast.success('welcome to the application')
         console.log("navigating")
        navigate('/dashboard')
      
      }else {
        toast.error('invalid email or password')
      }
    }
    }

  return (
    <div className="login-dark">
      <form onSubmit={onLogin}>
      <div className="illustration ">
          <img src={imageSrc} alt="LOGO" style={{height:"120px"}} />
        </div>
        <div className="form-group">
          <label htmlFor="Employee Id">Employee ID:</label>
          <input
             onChange={(e)=>{setEmail(e.target.value)}}
            className="form-control"
            type="email"
            name="email"
            placeholder="Employee Id"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e)=>{setPassword(e.target.value)}}
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
            <button className="btn btn-primary btn-block" 
            type="submit">Log In</button>
          
        </div>
        <a href="#" className="forgot">
          Forgot your email or password?
        </a>
      </form>
    </div>
  );
}

export default Login;
