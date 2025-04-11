// features/WeatherBackground.tsx

import React from 'react';
import { Box } from '@mui/material';

interface WeatherBackgroundProps {
    condition: string;
    children: React.ReactNode;
}

const WeatherBackground: React.FC<WeatherBackgroundProps> = ({ condition, children }) => {
    const getBackgroundStyle = (condition: string): React.CSSProperties => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return { backgroundColor: '#FFD700' }; // bright yellow for sunny
            case 'rainy':
                return { backgroundColor: '#A9A9A9' }; // dark gray for rainy
            case 'cloudy':
                return { backgroundColor: '#D3D3D3' }; // light gray for cloudy
            case 'snow':
                return { backgroundColor: '#ADD8E6' }; // light blue for snowy
            default:
                return { backgroundColor: '#FFFFFF' }; // default white background
        }
    };

    return (
        <Box
            sx={{
                ...getBackgroundStyle(condition),
                minHeight: '100vh',
                transition: 'background-color 0.5s ease',
                p: 2,
            }}
        >
            {children}
        </Box>
    );
};

export default WeatherBackground;
