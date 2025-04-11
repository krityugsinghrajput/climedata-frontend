import React from 'react';
import { Box, Typography, Button, Grid, Paper, Container } from '@mui/material';
import { WiDaySunny, WiHumidity, WiStrongWind } from 'react-icons/wi';

// Cast icons to valid React functional components
const DaySunnyIcon = WiDaySunny as unknown as React.FC<{ size?: number; color?: string }>;
const HumidityIcon = WiHumidity as unknown as React.FC<{ size?: number; color?: string }>;
const StrongWindIcon = WiStrongWind as unknown as React.FC<{ size?: number; color?: string }>;

const HomePage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            {/* Hero Section */}
            <Box sx={{
                textAlign: 'center',
                marginTop: '50px',
                background: 'linear-gradient(135deg, #ba0c2f, #a7b1b7)',
                padding: '80px 20px',
                color: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}>
                <Typography variant="h3" fontWeight={700}>
                    Welcome to ClimeData
                </Typography>
                <Typography variant="h5" fontWeight={400} mt={2}>
                    Your trusted source for real-time weather updates.
                </Typography>
                <Button
                    variant="contained"
                    component="a"
                    href="/search"
                    sx={{
                        marginTop: '30px',
                        padding: '12px 24px',
                        backgroundColor: '#ffffff',
                        color: '#ba0c2f',
                        '&:hover': { backgroundColor: '#9b2d3b', color: '#fff' },
                        fontWeight: 600,
                        borderRadius: '8px'
                    }}
                >
                    Get Started
                </Button>
            </Box>

            {/* Weather Forecast Section */}
            <Box mt={6}>
                <Typography variant="h4" fontWeight={600} textAlign="center" color="#ba0c2f">
                    Current Weather
                </Typography>
                <Grid container spacing={4} justifyContent="center" mt={3}>
                    {[
                        { label: 'Temperature', value: '28°C', icon: <DaySunnyIcon size={50} color="#fff" />, bg: '#ba0c2f' },
                        { label: 'Humidity', value: '60%', icon: <HumidityIcon size={50} color="#fff" />, bg: '#a7b1b7' },
                        { label: 'Wind Speed', value: '15 km/h', icon: <StrongWindIcon size={50} color="#ba0c2f" />, bg: '#ffffff', textColor: '#000' }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Paper sx={{
                                padding: '30px',
                                textAlign: 'center',
                                backgroundColor: item.bg,
                                color: item.textColor || '#fff',
                                boxShadow: 5,
                                borderRadius: '15px',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                                }
                            }}>
                                {item.icon}
                                <Typography variant="h6" fontWeight={600} mt={2}>{item.label}</Typography>
                                <Typography variant="h4" fontWeight={600}>{item.value}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Explore Weather Map Section */}
            <Box mt={6} textAlign="center">
                <Typography variant="h4" fontWeight={600} color="#ba0c2f">
                    Explore the Weather Map
                </Typography>
                <Button variant="contained" sx={{
                    marginTop: '20px',
                    backgroundColor: '#ba0c2f',
                    color: '#ffffff',
                    '&:hover': { backgroundColor: '#9b2d3b' },
                    padding: '12px 24px',
                    fontWeight: 600,
                    borderRadius: '8px'
                }}>
                    View Map
                </Button>
            </Box>

            {/* Weather Alerts Section */}
            <Box mt={6} textAlign="center" bgcolor="#ba0c2f" color="#ffffff" p={4} borderRadius={2}>
                <Typography variant="h4" fontWeight={600}>
                    Weather Alerts
                </Typography>
                <Typography variant="body1" fontWeight={400} mt={2}>
                    No weather alerts at the moment. Stay warm!
                </Typography>
            </Box>

            {/* About Us Section */}
            <Box mt={6} textAlign="center" bgcolor="#a7b1b7" color="#ffffff" p={4} borderRadius={2}>
                <Typography variant="h4" fontWeight={600}>
                    About ClimeData
                </Typography>
                <Typography variant="body1" mt={2}>
                    ClimeData provides you with real-time weather information from around the world. We aim to help you plan your day and stay safe.
                </Typography>
            </Box>
        </Container>
    );
};

export default HomePage;
