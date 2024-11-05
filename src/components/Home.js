// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Adjust the path as necessary


const Home = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome to the Attendance Management System</h1>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/register">
                <button>Register</button>
            </Link>
        </div>
    );
};

export default Home;
