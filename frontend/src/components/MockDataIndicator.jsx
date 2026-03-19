import React, { useState, useEffect } from 'react';
import { getMockDataStatus } from '../services/api';

const MockDataIndicator = () => {
    const [isUsingMockData, setIsUsingMockData] = useState(true); // Always true for demo

    useEffect(() => {
        // Always show mock data indicator for demo
        setIsUsingMockData(true);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            background: '#ffc107',
            color: '#000',
            padding: '8px 12px',
            borderRadius: '5px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
            🎭 Demo Mode (Using Mock Data)
        </div>
    );
};

export default MockDataIndicator;
