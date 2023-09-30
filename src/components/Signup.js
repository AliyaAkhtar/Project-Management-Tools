import React from 'react'
import './Login.css'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import BgVideo from './BgVideo'

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'teamMember', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Account Created Successfully!');
                // Redirect to the appropriate page based on user type
                navigate('/'); 
            } else {
                toast.error('Failed to create an account. Please check your input.');
                console.error('Failed to create an account:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section>
            <BgVideo/>
            <div className='form-box sign'>
                <div className='form-value'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='login-heading'>SIGNUP</h2>
                        <div className="inputbox">
                            <AiOutlineUser className="icons" />
                            <input type="user" name="username" value={formData.username} onChange={handleChange} required />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="inputbox">
                            <AiOutlineMail className="icons" />
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="inputbox">
                            <RiLockPasswordLine className="icons" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-box">
                            <input type="radio" id="projectManager" name="role" value="projectManager" checked={formData.role === 'projectManager'} onChange={handleChange} />
                            <label htmlFor="projectManager">Project Manager</label>
                            <input type="radio" id="teamMember" name="role" value="teamMember" checked={formData.role === 'teamMember'} onChange={handleChange} />
                            <label htmlFor="teamMember">Team Member</label>
                        </div>

                        <button className='btnsignup'>SignUp</button>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default Signup
