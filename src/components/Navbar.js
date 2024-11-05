// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS for the navbar



const Navbar = () => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/qr-scanner">QR Code Scanner</Link>
            <Link to="/attendance/add">Attendance</Link>
        </nav>
    );
};

export default Navbar;
