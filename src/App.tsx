// App.tsx

import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchPage from "./pages/searchBar";
import AboutPage from "./pages/Aboutpage";
import NavBar from "./components/navBar";
import FavoriteLocations from "./features/favoriteLocations";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css";
import HistoricalWeatherTrends from "./features/historicalTrends";
import DocumentationPage from "./features/Docs";
import TemperatureUnitToggle from "./features/TemperatureUnitToggle";
import ForecastList from "./features/ForecastList";
import WeatherBackground from "./features/WeatherBackground";
import AppInformation from "./pages/app-info";
import RequestNewLocation from "./features/requestNewLocation";

// Use Inter as the primary font
const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
});

function App() {
    // Sample forecast data for ForecastList component
    const sampleForecast = [
        { date: '2025-03-15', temperature: 22, condition: 'Sunny', icon: 'https://example.com/sunny.png' },
        { date: '2025-03-16', temperature: 18, condition: 'Cloudy', icon: 'https://example.com/cloudy.png' },
        { date: '2025-03-17', temperature: 20, condition: 'Rainy', icon: 'https://example.com/rainy.png' },
        { date: '2025-03-18', temperature: 15, condition: 'Snow', icon: 'https://example.com/snow.png' },
        { date: '2025-03-19', temperature: 23, condition: 'Sunny', icon: 'https://example.com/sunny.png' },
    ];

    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {/* Navigation Bar */}
                <NavBar />

                {/* Main Content Area */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/request-new-location" element={<RequestNewLocation />} />
                    <Route path="/historical-trend" element={<HistoricalWeatherTrends />} />
                    <Route path="/app-info" element={<AppInformation />} />

                    {/* Features */}
                    <Route path="/docs" element={<DocumentationPage />} />
                    <Route path="/temp-toggle" element={<TemperatureUnitToggle temperature={25} />} />
                    <Route path="/forecast-list" element={<ForecastList forecast={sampleForecast} />} />
                    <Route
                        path="/weather-background"
                        element={
                            <WeatherBackground condition="sunny">
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    <h2>Weather Background Demo</h2>
                                    <p>This area changes its background based on the current weather condition.</p>
                                </div>
                            </WeatherBackground>
                        }
                    />

                    {/* Special Features */}
                    <Route path="/favorites" element={<FavoriteLocations />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
