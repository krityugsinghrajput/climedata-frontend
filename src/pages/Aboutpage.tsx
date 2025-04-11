import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const AboutPage: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 600 }}>
                <Typography variant="h4" gutterBottom>
                    About ClimeData
                </Typography>
                <Typography variant="body1" paragraph>
                    ClimeData is a full stack weather application built with Django (backend) and React with TypeScript (frontend).
                </Typography>
                <Typography variant="body1">
                    Use the search feature to get current weather information for cities worldwide.
                </Typography>
            </Paper>
        </Box>
    );
};

export default AboutPage;
