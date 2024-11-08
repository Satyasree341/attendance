import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useSwipeable } from 'react-swipeable';

const Attendance = () => {
    const navigate = useNavigate();
    const [attendanceType, setAttendanceType] = useState('');
    const [message, setMessage] = useState('');
    const [isSwiped, setIsSwiped] = useState(false);
    const [buttonSubmitted, setButtonSubmitted] = useState(false);

    const handleAttendance = async () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        // Check if token exists and is valid
        if (!token) {
            alert("Please log in again.");
            navigate('/login');
            return;
        }

        try {
            // Decode the token to check its expiration time
            const decodedToken = jwtDecode(token);
            const isTokenExpired = decodedToken.exp * 1000 < Date.now();
            if (isTokenExpired) {
                alert("Session expired. Please log in again.");
                navigate('/login');
                return;
            }
        } catch (error) {
            console.error("Invalid token:", error);
            alert("Invalid session. Please log in again.");
            navigate('/login');
            return;
        }

        const payload = {
            loginOption: attendanceType,
            user: { id: id },
            instituteName: "apteknow",
            instituteLatitude: 14.5460,
            instituteLongitude: 77.4550
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/attendance/add',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Handle success response
            if (response.data && response.data.message) {
                setMessage(response.data.message);
            } else {
                setMessage('Attendance marked successfully.');
            }

            // Navigate to the Success page after successful attendance marking
            navigate('/success'); // This triggers the Success page.

        } catch (error) {
            // Handle error responses
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please log in again.");
                navigate('/login');
            } else {
                setMessage('Attendance marking failed: ' + (error.response?.data.message || error.message));
            }
        }
    };

    // Handle swipe action (on swiping right)
    const onSwipedRight = () => {
        if (!buttonSubmitted) {
            setIsSwiped(true);
            setButtonSubmitted(true);  // Disable the button after swipe
            setTimeout(() => {
                handleAttendance(); // Trigger attendance marking on swipe
            }, 500); // Slight delay to simulate swipe action
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedRight,
        trackMouse: true,  // Enable tracking mouse swipe (for testing in desktop)
    });

    return (
        <div
            {...swipeHandlers}
            className="min-h-screen bg-gradient-to-tr from-teal-100 via-teal-50 to-gray-100 flex items-center justify-center"
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">Mark Attendance</h2>

                <select
                    value={attendanceType}
                    onChange={(e) => setAttendanceType(e.target.value)}
                    required
                    className="block w-full p-3 mb-5 border border-gray-300 rounded-md bg-gray-50 text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="">Select Attendance Type</option>
                    <option value="login">Morning Login</option>
                    <option value="lunch">Lunch</option>
                    <option value="Tea">Tea Break</option>
                </select>

                {/* Red Swipe Button */}
                <div className="relative w-64 h-12 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                    {!isSwiped ? (
                        <div
                            className="absolute top-0 left-0 h-full bg-red-500 text-white flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: '50%' }}
                            onClick={onSwipedRight}
                        >
                            Slide to Send
                        </div>
                    ) : (
                        <div
                            className="absolute top-0 right-0 h-full w-full bg-green-500 text-white flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
                        >
                            Sending...
                        </div>
                    )}
                </div>

                {message && (
                    <p className="mt-4 text-center text-teal-600 font-semibold">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Attendance;
