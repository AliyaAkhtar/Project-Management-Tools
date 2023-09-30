import React from 'react'
import './Login.css'
import {RiLockPasswordLine} from 'react-icons/ri'
import {AiOutlineMail} from 'react-icons/ai'
import BgVideo from './BgVideo'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          
          if (response.ok) {
            localStorage.setItem('token', data.authtoken);
            // Login successful
            toast.success("Successfully Logged In!");
            console.log('Authentication token:', data.authtoken);

            console.log(data.redirectUrl)

            // Ensure that data.redirectUrl is a valid route
              if (data.redirectUrl) {
                navigate(data.redirectUrl);
              } else {
                console.error('Redirect URL is not defined in the response.');
                // Handle the case where redirectUrl is not defined
              }
          } else {
            // Login failed
            console.error('Login failed.');
            toast.warning("Login Failed!");
            
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
  return (
    <section>
        <BgVideo/>
        <div className='form-box'>
            <div className='form-value'>
                <form onSubmit={handleSubmit}>
                    <h2 className='login-heading'>LOGIN</h2>
                    <div className='inputbox'>
                        <AiOutlineMail className='icons'/>
                        <input type='email' name='email' value={formData.email} onChange={handleChange} required/>
                        <label htmlFor=''>Email</label>
                    </div>
                    <div className='inputbox'>
                        <RiLockPasswordLine className='icons'/>
                        <input type='password' name='password' value={formData.password} onChange={handleChange} required/>
                        <label htmlFor=''>Password</label>
                    </div>
                    <div className='forget'>
                        <label htmlFor=''><input type='checkbox' />Remember Me <a href='#'>Forget Password</a></label>
                    </div>
                    <button className='btnlogin'>Login</button>
                    <div className='register'>
                        <p className='account'>Don't have a account <Link to='/signup'>Register</Link></p>
                    </div>
                </form>

            </div>
        </div>
      
    </section>
  )
}

export default Login
