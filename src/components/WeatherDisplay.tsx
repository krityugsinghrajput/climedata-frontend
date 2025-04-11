import React from "react"; // Import React for building components
import { Card, CardContent, Typography } from "@mui/material"; // Import Material UI components for layout and styling

// Define the shape of the weather data expected as a prop
interface WeatherProps {
    data: {
        name: string; // City name
        main: { temp: number }; // Temperature data (in Celsius)
        weather: { description: string; icon: string }[]; // Weather conditions array with description and icon
    };
}

// Functional component to display weather information
const WeatherDisplay: React.FC<WeatherProps> = ({ data }) => {
    return (
        <Card style={{ marginTop: "20px", padding: "10px" }}> {/* Material UI Card for layout and shadow effect */}
            <CardContent> {/* Content container inside the card */}
                <Typography variant="h5">{data.name}</Typography> {/* City name in larger heading style */}
                <img
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} // Weather icon URL
                    alt="weather icon" // Alt text for accessibility
                />
                <Typography variant="h6">{data.main.temp}°C</Typography> {/* Display temperature in Celsius */}
                <Typography>{data.weather[0].description}</Typography> {/* Weather description (like Clear, Rain, etc.) */}
            </CardContent>
        </Card>
    );
};

export default WeatherDisplay; // Export component so it can be used in other parts of the app