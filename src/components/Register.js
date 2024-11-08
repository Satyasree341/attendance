import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/register', { email, password });
            setMessage('Registration successful. You can now log in.');
            navigate('/login'); // Navigate to login page after successful registration
        } catch (error) {
            setMessage('Invalid credentials.');   
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-yellow-100 to-orange-100">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-105">
                <h2 className="text-3xl font-extrabold text-gray-700 text-center mb-6">Register</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-600 font-medium">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your password"
                            required
                            className="mt-1 w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-xl shadow-md hover:bg-green-600 transition duration-300 transform hover:-translate-y-1"
                    >
                        Register
                    </button>
                    {message && (
                        <p className={`text-center mt-4 ${message.includes('Invalid') ? 'text-red-500' : 'text-green-500'} font-medium`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="text-center text-gray-500 mt-6 text-sm">
                    Already have an account? 
                    <a href="/login" className="text-green-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
