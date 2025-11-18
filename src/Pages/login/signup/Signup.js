import React, { useState } from 'react';
import { account } from '../../../variables/services';

import "./Signup.css"

const Signup = ({ setLogin, setUser }) => {
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [passMatch, setPassMatch] = useState(false);
    const [formData, setFormData] = useState({
        accountName: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleContinue = () => {
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passMatch){
            setError("")
            fetch(account + '/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    ["password"]: btoa(formData.password)
                })
            }).then(res => {
                if (!res.ok) { 
                return res.json().then(data => {
                    throw new Error("Error: " + (data.message || "Unknown error")); // Handle API error messages
                });
                }
                return res.json(); // Only parse JSON if response is OK (200)
            }).then(data => {
                setUser({ userId: data.userId });
                setLogin(true)
            })
            .catch(error => {
                setError(error.message); // Store error message in state
                console.error("Error fetching user:", error);
            });
        }
        else {
            setError("error: passwords dont match")
        }
    }

    return (
            <form className='signup-form login-form glassmorphism' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
                {step === 1 && (
                    <>
                        <div className='form-input'>
                            <label>Account Name:</label>
                            <input
                                type="text"
                                name="accountName"
                                value={formData.accountName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-input'>
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='form-input'>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <label className='error-message'>{error}</label>
                        <button type="button" onClick={handleContinue}>
                            Continue
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                
                                onChange={(e)=>{e.target.value === formData.password ? setPassMatch(true) : setPassMatch(false)}}
                                required
                            />
                        </div>
                        <label className='error-message'>{error}</label>
                        <button type="submit">Create User</button>
                    </>
                )}
            </form>
    );
};

export default Signup;