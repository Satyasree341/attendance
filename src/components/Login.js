// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css'; // Adjust the path as necessary


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { email, password });
            
            // Log the entire response to see its structure
            
           
            const token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                    
                setTimeout(() => navigate('/qr-scanner'), 200); // Navigate to QR Code Scanner page
            } else {
                console.error("Token not found in response");
                alert("Login failed: Token not found in response");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'Invalid credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" >Login</button>
            </form>
        </div>
    );
};

export default Login;
