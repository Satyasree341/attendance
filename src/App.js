import './App.css';
import React from 'react';
import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import QRCodeScanner from './components/QRCodeScanner';
import Attendance from './components/Attendance';
import Success from './components/Success';

function App() {
    return (
        <Router>
          
            
            <Routes>
                {/* Set Home as the default route */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/qr-scanner" element={<QRCodeScanner />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/success" element={<Success />} />

            </Routes>
        </Router>
    );
}

export default App;
