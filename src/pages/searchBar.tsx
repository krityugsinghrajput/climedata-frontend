import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Paper,
    Checkbox,
    FormControlLabel,
    Radio,
    RadioGroup,
    Slider,
    Container,
} from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const API_KEY = "J2lOHaEhmbfuRfKIlGcRAXY5S0JVKr7K";

const STATES: Record<string, string[]> = {
    California: ["Los Angeles", "San Francisco", "San Diego"],
    "New York": ["New York City", "Buffalo", "Rochester"],
    Texas: ["Houston", "Dallas", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"],
    Illinois: ["Chicago", "Springfield", "Naperville"],
};

const SearchPage: React.FC = () => {
    const [state, setState] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [unit, setUnit] = useState<string>("imperial");
    const [hourly, setHourly] = useState<boolean>(false);
    const [alerts, setAlerts] = useState<boolean>(false);
    const [temperatureRange, setTemperatureRange] = useState<number[]>([30, 100]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fetchingWeather, setFetchingWeather] = useState<boolean>(false);
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    const fetchWeatherData = async () => {
        if (!state || !city) {
            setError("Please select both a state and a city.");
            return;
        }

        setFetchingWeather(true);
        setError(null);
        setWeatherData(null);

        try {
            const location = `${city}, ${state}, USA`;
            const response = await fetch(
                `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(
                    location
                )}&units=${unit}&apikey=${API_KEY}`
            );
            const data = await response.json();

            if (!data || !data.timelines) {
                throw new Error("Weather data not found for this location.");
            }

            setWeatherData(data.timelines.hourly[0]);
        } catch (err: any) {
            setError(err.message || "Error fetching weather data.");
        } finally {
            setFetchingWeather(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ marginTop: 6 }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: 6,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        gutterBottom
                        align="center"
                        color="black"
                    >
                        Weather Search
                    </Typography>

                    {loading ? (
                        <Skeleton height={400} />
                    ) : (
                        <Grid container spacing={4}>
                            {/* State */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>State</InputLabel>
                                    <Select
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        label="State"
                                    >
                                        {Object.keys(STATES).map((st) => (
                                            <MenuItem key={st} value={st}>
                                                {st}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* City */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>City</InputLabel>
                                    <Select
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="City"
                                        disabled={!state}
                                    >
                                        {state &&
                                            STATES[state]?.map((ct) => (
                                                <MenuItem key={ct} value={ct}>
                                                    {ct}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Temperature Range */}
                            <Grid item xs={12}>
                                <Typography gutterBottom color="black">
                                    Preferred Temperature Range (°F)
                                </Typography>
                                <Slider
                                    value={temperatureRange}
                                    onChange={(e, newValue) =>
                                        setTemperatureRange(newValue as number[])
                                    }
                                    valueLabelDisplay="auto"
                                    min={-20}
                                    max={120}
                                />
                            </Grid>

                            {/* Units */}
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <Typography gutterBottom color="black">
                                        Units
                                    </Typography>
                                    <RadioGroup
                                        row
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="imperial"
                                            control={<Radio />}
                                            label="Fahrenheit (°F)"
                                        />
                                        <FormControlLabel
                                            value="metric"
                                            control={<Radio />}
                                            label="Celsius (°C)"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                            {/* Checkboxes */}
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={hourly}
                                            onChange={(e) => setHourly(e.target.checked)}
                                        />
                                    }
                                    label="Show Hourly Forecast"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={alerts}
                                            onChange={(e) => setAlerts(e.target.checked)}
                                        />
                                    }
                                    label="Enable Weather Alerts"
                                />
                            </Grid>
                        </Grid>
                    )}

                    {/* Button */}
                    {fetchingWeather ? (
                        <Skeleton height={60} />
                    ) : (
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                fontSize: "1.3rem",
                                padding: 2,
                                marginTop: 4,
                                backgroundColor: "#000",
                                color: "#fff",
                                "&:hover": { backgroundColor: "#333" },
                            }}
                            onClick={fetchWeatherData}
                        >
                            See Weather
                        </Button>
                    )}

                    {error && (
                        <Typography
                            variant="body1"
                            color="error"
                            align="center"
                            sx={{ marginTop: 2 }}
                        >
                            {error}
                        </Typography>
                    )}

                    {weatherData && (
                        <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            sx={{ marginTop: 4 }}
                        >
                            <WeatherWidget
                                title="Temperature"
                                data={`${weatherData.values.temperature} °F`}
                            />
                            <WeatherWidget
                                title="Wind Speed"
                                data={`${weatherData.values.windSpeed} mph`}
                            />
                            <WeatherWidget
                                title="Humidity"
                                data={`${weatherData.values.humidity} %`}
                            />
                            <WeatherWidget
                                title="UV Index"
                                data={`${weatherData.values.uvIndex}`}
                            />
                        </Grid>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

interface WeatherWidgetProps {
    title: string;
    data: string | number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ title, data }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    textAlign: "center",
                    padding: 2,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                    backgroundColor: "#f7f7f7",
                }}
            >
                <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="black">
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" color="black">
                        {data}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SearchPage;
