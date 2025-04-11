import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Paper,
} from '@mui/material';

const RequestNewLocationForm: React.FC = () => {
    const [location, setLocation] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        setError('');

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/snapforms-api/request-location-form/',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location,
                        country,
                        state,
                        description,
                        userName,
                        userEmail,
                    }),
                }
            );

            if (response.ok) {
                setSuccess(true);
                setLocation('');
                setCountry('');
                setState('');
                setDescription('');
                setUserName('');
                setUserEmail('');
            } else {
                const data = await response.json();
                setError(data.error || 'Submission failed. Please try again.');
            }
        } catch (err) {
            setError('Submission failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper
                sx={{
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                >
                    Request New Location
                </Typography>
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Request submitted successfully!
                    </Alert>
                )}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Location Name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="State/Province"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Additional Details"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Your Email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit Request
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default RequestNewLocationForm;
