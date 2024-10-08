import { useNavigate } from "react-router-dom";
import imageSrc from '../images/facebook_profile_image.png';
import { useState } from "react";
import {login} from '../service/user'
import { toast } from "react-toastify";





function Login() {
   
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    
    const navigate = useNavigate()

    const onLogin = async () => {
        
       if (email.length === 0) {
        console.log('Empty Email')
        toast.warning('enter email')
    }else if (password.length === 0) {
      toast.warning('enter password')
    }else {
      
      try{
      const result = await login(email, password)
      if (result['mesg'] === 'Successful Auth!!!!') {
            
        const { jwt, firstName , lastName ,role ,id} = result
         
            sessionStorage.setItem('token', jwt)
            sessionStorage.setItem('name', firstName+" "+lastName)
            sessionStorage.setItem('role',role)
            sessionStorage.setItem('id',id)
         toast.success(`welcome ${result['firstName']} ${result['lastName']}` )
         console.log("navigating")
       
         navigate('/dashboard')
      }else {
        toast.error('invalid email or password')
      }
    }
    catch{
       toast.error('invalid login') 
    }
    }
    }

  return (
    <div className="login-dark">
      <div className="form">
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
            onClick={onLogin}>Log In</button>
          
        </div>
       
        </div>
    </div>
  );
}

export default Login;
