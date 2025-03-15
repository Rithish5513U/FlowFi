import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/Login.css';
import TypingAnimation from '../component/TypingText';
import {message} from 'antd'
import {setPrivateKey} from '../redux/privatekey';
import {useDispatch, useSelector} from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privateKey = useSelector((state) => state.privateKey.privateKey);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const onFinishHandler = async (event) => {
    event.preventDefault(); 

    try {
      setLoading(true);
      const loginData = { email, password };

      const response = await axios.post("http://localhost:5000/user/login", loginData);
      // console.log(response.data.token);
      dispatch(setPrivateKey(response.data.token));
      
      console.log(privateKey);
      // if(response.data.token){
      //   localStorage.setItem('token', response.data.token);
      // }
      // else{
      //   console.log("login failed")
      // }
      setLoading(false);
      message.success("Login Successful");
      setTimeout(()=>{
        navigate('/preference');
      },2000)
      // navigate('/preference')
      
    } catch (error) {
      setLoading(false);
      message.error(error);
    }
  };

  return (
    <div className='main-log'>
      <div className='left'>
        <div className='topic'>
          <h1>FlowFi</h1>
          <h1>FlowFi</h1>
          <TypingAnimation />
        </div>
      </div>
      <div className='right'>
        <div className='login-container'>
          <h2>Login</h2>
          <form onSubmit={onFinishHandler}>
            <input 
              className='user' 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              className='pass' 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='sub' type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className='l'>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
