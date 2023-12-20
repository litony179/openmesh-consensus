import React, { useState, FormEvent } from 'react';
import '../Styles/App.scss';
import '../Styles/Login.scss';
import LoginRegisterImg from '../Components/login-register-img.jpeg';
import { useUser } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

import { ILoginInput } from '../services/AuthService';


export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<ILoginInput>({
    userEmail: '',
    userPassword: '',
  });
  const { loginUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    await loginUser(loginData);
    navigate('/home');

  };

  return (
    <>
      <div className='d-flex'>
        <img src={LoginRegisterImg} alt='logo' className='w-50 big-img' />
        <form className="login-form w-70" onSubmit={handleLogin}>
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
          <button type="submit" className="login-btn">Login</button>
          <div className="footer-links">
            <a href="/forgot-password">Forgot Password?</a>
            <span>No account? <a href="/register">Register</a></span>
          </div>
        </form>
      </div>
    </>
  );
};
