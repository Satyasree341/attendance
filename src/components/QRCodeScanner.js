// src/components/QRCodeScanner.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { QrReader } from 'react-qr-reader';



const QRCodeScanner = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [locationError, setLocationError] = useState('');

    const handleScan = (result) => {
        if (result) {
            let data = result.text;
            data = data.replace(/([a-zA-Z]+):/g, '"$1":').replace(/'/g, '"');
            try {
                const parsedData = JSON.parse(data);
                console.log(parsedData.institutename);
                checkLocation();
            } catch (err) {
                console.error("Error parsing QR code data", err);
                setError('Invalid QR code format');
            }
        }
    };

    const handleError = (error) => {
        console.error("QR Code scanning error:", error);
        setError('Unable to access camera or scan QR code');
    };

    const checkLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const instituteLatitude = 12.9107931;
                const instituteLongitude = 77.5963159;

                const distance = calculateDistance(latitude, longitude, instituteLatitude, instituteLongitude);
                if (distance >= 50) {
                    navigate('/attendance');
                } else {
                    alert('You must be within 50m radius of the institute.');
                }
            }, (error) => {
                console.error('Geolocation error:', error);
                alert('Unable to retrieve your location. Please allow location access.');
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInMetres = R * c * 1000;
        return distanceInMetres;
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">QR Code Scanner</h2>
            {error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <QrReader
                    delay={300}
                    onError={handleError}
                    onResult={handleScan}
                    style={{ width: '100%' }}
                    className="border border-gray-300 rounded-lg mb-6"
                />
            )}
            {locationError && <p className="text-red-600 mt-2">{locationError}</p>}
        </div>
    );
};

export default QRCodeScanner;
