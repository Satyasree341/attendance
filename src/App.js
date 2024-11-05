import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import QRCodeScanner from './components/QRCodeScanner';
import Attendance from './components/Attendance';
import Navbar from './components/Navbar';


function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/qr-scanner" element={<QRCodeScanner />} />
                <Route path="/attendance" element={<Attendance />} />
            </Routes>
        </Router>
    );
}

export default App;
