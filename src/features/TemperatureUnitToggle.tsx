// features/TemperatureUnitToggle.tsx

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

type TemperatureUnitToggleProps = {
    temperature: number;
};

const TemperatureUnitToggle: React.FC<TemperatureUnitToggleProps> = ({ temperature }) => {
    const [unit, setUnit] = useState<'C' | 'F'>('C');

    const toggleUnit = () => {
        setUnit(prev => (prev === 'C' ? 'F' : 'C'));
    };

    const convertToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

    return (
        <Box textAlign="center" p={2}>
            <Typography variant="h6">
                Temperature:{" "}
                {unit === 'C'
                    ? `${temperature.toFixed(1)} °C`
                    : `${convertToFahrenheit(temperature).toFixed(1)} °F`}
            </Typography>
            <Button variant="contained" onClick={toggleUnit} sx={{ mt: 2 }}>
                Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
            </Button>
        </Box>
    );
};

export default TemperatureUnitToggle;
