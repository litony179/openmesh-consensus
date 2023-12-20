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
      <div className='d-flex center'>
        <img src={LoginRegisterImg} alt='logo' className='w-70 big-img pl-3 pt-2' />
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
          <br />
          <br />
          <br />
          <a href="/forgot-password" className='center-span'>Forgot Password?</a>
          <br />

          <hr />
          <br />

          <span className='center-span'>No account?&nbsp;&nbsp;<a href="/register" className='underline'>Register</a></span>
        </form>
      </div>
    </>
  );
};
