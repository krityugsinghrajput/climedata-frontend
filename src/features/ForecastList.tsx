// features/ForecastList.tsx

import React from 'react';
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Typography,
    Box
} from '@mui/material';

export interface Forecast {
    date: string;        // e.g., "2025-03-15"
    temperature: number; // temperature in Celsius
    condition: string;   // e.g., "Sunny", "Cloudy", etc.
    icon?: string;       // optional URL for a weather icon
}

interface ForecastListProps {
    forecast: Forecast[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                5-Day Forecast
            </Typography>
            <List>
                {forecast.map((day, index) => (
                    <ListItem key={index} divider>
                        {day.icon && (
                            <ListItemAvatar>
                                <Avatar alt={day.condition} src={day.icon} />
                            </ListItemAvatar>
                        )}
                        <ListItemText
                            primary={day.date}
                            secondary={`${day.condition} - ${day.temperature.toFixed(1)}°C`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ForecastList;
