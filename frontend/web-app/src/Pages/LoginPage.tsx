import React, { useState, FormEvent } from 'react';
import '../Styles/App.scss';
import '../Styles/Login.scss';

interface LoginState {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginState>({
    email: '',
    password: '',
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
    // Here you would handle the login submission, e.g., by sending the data to an API
    console.log('Login data:', loginData);
  };

  return (
    <>
      <div className='d-flex'>
        <img src='../Components/login-register-img.jpeg' alt='logo' className='w-50'/>
        <form className="login-form w-70" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
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
