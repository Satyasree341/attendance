import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Attendance.css'; // Adjust the path as necessary

const Attendance = () => {
    const [attendanceType, setAttendanceType] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAttendance = async () => {
        const token = localStorage.getItem('token');
        console.log("Token:", token); // Log the token for debugging

        if (!token) {
            alert("Please log in again.");
            navigate('/login');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/attendance/add',
                { attendanceType }, // Removed date from the payload
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Correctly set the Authorization header
                    }
                }
            );

            // Check if the response contains a message
            if (response.data && response.data.message) {
                setMessage(response.data.message);
            } else {
                setMessage('Attendance marked successfully.');
            }
            console.log("Attendance marked successfully: ", response.data);
            navigate('/success'); // Navigate to Success page after submitting

        } catch (error) {
            console.error("Error while marking attendance:", error); // Log the full error

            if (error.response) {
                // If there's a response from the server
                if (error.response.status === 401) {
                    alert("Session expired. Please log in again.");
                    navigate('/login');
                } else {
                    setMessage('Attendance marking failed: ' + (error.response.data.message || error.message));
                }
            } else {
                // If there's no response from the server
                setMessage('Attendance marking failed: ' + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Mark Attendance</h2>
            <select value={attendanceType} onChange={(e) => setAttendanceType(e.target.value)} required>
                <option value="">Select Attendance Type</option>
                <option value="login">Login</option>
                <option value="Tea">Tea Break</option>
                <option value="lunch">Lunch</option>
                <option value="logout">Logout</option>
            </select>
            <button onClick={handleAttendance}>Mark Attendance</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Attendance;
