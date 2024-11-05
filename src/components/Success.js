import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/qr-scanner'); // Redirect back to QR Code Scanner page
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Your attendance is marked successfully!</h2>
            <button onClick={handleClose}>Close</button>
        </div>
    );
};

export default Success;