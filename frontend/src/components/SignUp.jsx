import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.css';
import TypingAnimation from '../component/TypingText';
import {message} from 'antd'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
        const userData = { name, email, password };
        const response = await axios.post("http://localhost:5000/user/register", userData);
        console.log("Response:", response);
        message.success("Signup Successful"); 
    } catch (error) {
        setLoading(false);
        if (error.response) {
            console.log("Error Response:", error.response.data); 
            message.error(error.response.data.message || "Signup failed.");
        } else if (error.request) {
            console.log("No Response:", error.request);
            message.error("No response from server. Check backend.");
        } else {
            console.log("Axios Error:", error.message);
            message.error("Something went wrong.");
        }
    }
};


  return (
    <div className='main-sig'>
      <div className='leftt'>
        <div className='topic'>
          <h1>SalesVista AI</h1>
          <h1>SalesVista AI</h1>
          <TypingAnimation />
        </div>
      </div>
      <div className='rightt'>
        <div className='signup-container'>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}> 
            <input
              className='username'
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className='email'
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='password'
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='submit' type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className='s'>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
