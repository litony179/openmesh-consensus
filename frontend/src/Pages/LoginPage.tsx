import React, { useState, FormEvent } from 'react';
import '../Styles/App.scss';
import '../Styles/Login.scss';
import LoginRegisterImg from '../Components/login-register-img.jpeg';
import { setJWT } from '../services/jwtManager';
import { apiCallPost } from '../services/api';

interface LoginState {
  userEmail: string;
  userPassword: string;
}

export const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginState>({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle the form submission, e.g., by sending the data to an API
    console.log('Form data:', loginData);
    apiCallPost('/loginuser', loginData)
      .then((r: any) => {
        // AFter registering -> otp -> logged in 
        setJWT(r.userAccessToken);
        console.log('Saved userAccessToken', r.userAccessToken);
      });
  };

  return (
    <>
      <div className='d-flex'>
        <img src={LoginRegisterImg} alt='logo' className='w-50 big-img' />
        <form className="login-form w-70" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="email"
              name="userEmail"
              placeholder="Enter Email"
              value={loginData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="userPassword"
              placeholder="Enter Password"
              value={loginData.userPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn" onClick={handleSubmit}>Login</button>
          <div className="footer-links">
            <a href="/forgot-password">Forgot Password?</a>
            <span>No account? <a href="/register">Register</a></span>
          </div>
        </form>
      </div>
    </>
  );
};