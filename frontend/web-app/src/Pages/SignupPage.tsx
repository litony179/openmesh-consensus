import React, { useState, FormEvent } from 'react';
import '../Styles/Signup.scss';
import '../Styles/App.scss';

import LoginRegisterImg from '../Components/login-register-img.jpeg';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
}

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission, e.g., by sending the data to an API
    console.log('Form data:', formData);
  };

  return (
    <>
      <div className='d-flex'>
        <img src={LoginRegisterImg} alt='logo' className='w-50 big-img' />
        <form className="register-form w-50" onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Mobile number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" required />
              I agree to the Terms and Privacy Policy
            </label>
          </div>
          <button type="submit" className="submit-btn">Create account</button>
          <div className="login-link">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </div>
    </>
  );
};
