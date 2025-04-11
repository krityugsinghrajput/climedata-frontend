import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Container } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface HistoricalData {
    date: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
}

type CityData = Record<string, HistoricalData[]>;

const cities = ["Los Angeles", "New York", "Chicago"];

const HistoricalWeatherTrends: React.FC = () => {
    const [cityData, setCityData] = useState<CityData>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching historical data for multiple cities.
        const fetchCityData = async () => {
            // Simulated dates for 7 days
            const dates = [
                "2025-03-01",
                "2025-03-02",
                "2025-03-03",
                "2025-03-04",
                "2025-03-05",
                "2025-03-06",
                "2025-03-07",
            ];

            const simulatedData: CityData = {};

            cities.forEach((city) => {
                simulatedData[city] = dates.map((date) => ({
                    date,
                    // Generate simulated values
                    temperature: Math.floor(Math.random() * 20) + 55, // 55-75°F
                    humidity: Math.floor(Math.random() * 20) + 50,      // 50-70%
                    windSpeed: Math.floor(Math.random() * 10) + 5,       // 5-15 mph
                }));
            });

            // Simulate a network delay
            setTimeout(() => {
                setCityData(simulatedData);
                setLoading(false);
            }, 1500);
        };

        fetchCityData();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 6 }}>
                <Typography variant="h5" fontWeight="700" align="center" color="black" gutterBottom>
                    Historical City Wise Weather Trends
                </Typography>
                <Grid container spacing={4}>
                    {cities.map((city) => (
                        <Grid item xs={12} sm={6} md={4} key={city}>
                            <Paper sx={{ padding: 2, borderRadius: 2, minHeight: 380 }}>
                                <Typography variant="h6" fontWeight="bold" align="center" mb={2} color="black">
                                    {city}
                                </Typography>
                                {loading ? (
                                    <Skeleton height={300} />
                                ) : (
                                    <Box sx={{ width: "100%", height: 300 }}>
                                        <ResponsiveContainer>
                                            <LineChart
                                                data={cityData[city]}
                                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                                                <XAxis dataKey="date" tick={{ fill: "#000" }} />
                                                <YAxis tick={{ fill: "#000" }} />
                                                <Tooltip />
                                                <Line
                                                    type="monotone"
                                                    dataKey="temperature"
                                                    stroke="#ba0c2f"
                                                    strokeWidth={2}
                                                    name="Temp (°F)"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="humidity"
                                                    stroke="#a7b1b7"
                                                    strokeWidth={2}
                                                    name="Humidity (%)"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="windSpeed"
                                                    stroke="#000"
                                                    strokeWidth={2}
                                                    name="Wind (mph)"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Box>
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default HistoricalWeatherTrends;
