import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Link,
    Divider,
} from '@mui/material';

const AppInformation: React.FC = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Weather App Information
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: 3,
                }}
            >
                <Table
                    sx={{
                        '& td, & th': {
                            border: '1px solid rgba(224, 224, 224, 1)',
                            padding: 1,
                        },
                        borderCollapse: 'collapse',
                    }}
                >
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'grey.300' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Section</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell variant="head">Overview</TableCell>
                            <TableCell>
                                This Weather App provides real-time weather updates and forecasts for locations worldwide. Built with React and TypeScript, it ensures a smooth and responsive user experience.
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">Key Features</TableCell>
                            <TableCell>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                    <li>Current weather conditions and forecasts</li>
                                    <li>Responsive design optimized for all devices</li>
                                    <li>Real-time data integration from reliable weather sources</li>
                                </ul>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">Technologies Used</TableCell>
                            <TableCell>
                                React, TypeScript, Material UI, OpenWeatherMap API, Tomorrow.io API, React Router DOM, Recharts, Axios Library, Django Framework, WhiteNoise, Concurrently Library, Django Rest Framework
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">Developer Information</TableCell>
                            <TableCell>
                                Developed by Krityug Nischal. For inquiries, please reach out at{' '}
                                <Link href="mailto:krityug@hotmail.com">
                                    krityug@hotmail.com
                                </Link>
                                .<br />
                                Version: 1.0.0
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AppInformation;
