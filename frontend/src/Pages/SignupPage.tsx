import React, { useState, FormEvent } from 'react';
import '../Styles/Signup.scss';
import '../Styles/App.scss';
import LoginRegisterImg from '../Components/login-register-img.jpeg';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { IRegisterInput } from '../services/AuthServices/AuthService';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IRegisterInput>({
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword: '',
    userRoles: {
      admin: 5150,
      editor: 1982,
      user: 2001
    }
  });
  const { registerUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    await registerUser(formData);
    navigate('/home');
  };

  return (
    <>
      <div className='d-flex'>
        <img src={LoginRegisterImg} alt='logo' className='w-50 big-img pl-3 pt-1' />
        <form className="register-form w-50 pt-2" onSubmit={handleRegister} >
          <h2>Register</h2>
          <div className="form-group">
            <input
              type="text"
              name="userFirstName"
              placeholder="First name"
              value={formData.userFirstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="userLastName"
              placeholder="Last name"
              value={formData.userLastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="Email"
              name="userEmail"
              placeholder="Enter email"
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="userPassword"
              placeholder="Create password"
              value={formData.userPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="userConfirmPassword"
              placeholder="Confirm password"
              value={formData.userConfirmPassword}
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