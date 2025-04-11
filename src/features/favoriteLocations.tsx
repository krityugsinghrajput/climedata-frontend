import React, { useState } from "react";
import {
    Box,
    CardContent,
    Typography,
    Grid,
    IconButton,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
} from "@mui/material";
import { Favorite, FavoriteBorder, Delete, ViewList, GridView } from "@mui/icons-material";

interface Location {
    id: number;
    city: string;
    state: string;
    temperature: number;
    humidity: number;
    condition: string;
    isFavorite: boolean;
}

const MOCK_LOCATIONS: Location[] = [
    { id: 1, city: "Los Angeles", state: "California", temperature: 75, humidity: 40, condition: "Sunny", isFavorite: true },
    { id: 2, city: "New York City", state: "New York", temperature: 50, humidity: 60, condition: "Rainy", isFavorite: false },
    { id: 3, city: "Denver", state: "Colorado", temperature: 32, humidity: 50, condition: "Snowy", isFavorite: true },
    { id: 4, city: "Miami", state: "Florida", temperature: 85, humidity: 80, condition: "Sunny", isFavorite: false },
    { id: 5, city: "Chicago", state: "Illinois", temperature: 28, humidity: 55, condition: "Cold", isFavorite: true },
    { id: 6, city: "Columbus", state: "Ohio", temperature: 30, humidity: 50, condition: "Cloudy", isFavorite: false },
    { id: 7, city: "Cleveland", state: "Ohio", temperature: 25, humidity: 65, condition: "Cold", isFavorite: true },
];

const FavoriteLocations: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
    const [search, setSearch] = useState<string>("");
    const [filterCondition, setFilterCondition] = useState<string>("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

    const toggleFavorite = (id: number) => {
        setLocations((prev) =>
            prev.map((loc) =>
                loc.id === id ? { ...loc, isFavorite: !loc.isFavorite } : loc
            )
        );
        setSnackbarMessage("Favorite status updated!");
    };

    const removeLocation = (id: number) => {
        setLocations((prev) => prev.filter((loc) => loc.id !== id));
        setSnackbarMessage("Location removed!");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredLocations = locations.filter((loc) =>
        loc.city.toLowerCase().includes(search.toLowerCase()) &&
        (filterCondition ? loc.condition === filterCondition : true)
    );

    return (
        <Box sx={{ maxWidth: 1200, margin: "auto", padding: 4 }}>
            {/* Header */}
            <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
                Favorite Locations
            </Typography>

            {/* Search & Filter Controls */}
            <Box sx={{ display: "flex", gap: 2, marginBottom: 3, alignItems: "center" }}>
                <TextField
                    label="Search City"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ flexGrow: 1 }}
                />

                <FormControl sx={{ minWidth: 160 }}>
                    <InputLabel id="filter-label">Filter by Weather</InputLabel>
                    <Select
                        labelId="filter-label"
                        id="filter-select"
                        value={filterCondition}
                        label="Filter by Weather"
                        onChange={(e) => setFilterCondition(e.target.value)}
                        renderValue={(selected) => {
                            if (!selected) {
                                return "All";
                            }
                            return selected;
                        }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="Sunny">Sunny</MenuItem>
                        <MenuItem value="Rainy">Rainy</MenuItem>
                        <MenuItem value="Snowy">Snowy</MenuItem>
                        <MenuItem value="Cold">Cold</MenuItem>
                        <MenuItem value="Cloudy">Cloudy</MenuItem>
                    </Select>
                </FormControl>



                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newMode) => setViewMode(newMode)}
                    sx={{ marginLeft: "auto" }}
                >
                    <ToggleButton value="grid">
                        <GridView />
                    </ToggleButton>
                    <ToggleButton value="list">
                        <ViewList />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Locations Display */}
            <Grid container spacing={3} direction={viewMode === "list" ? "column" : "row"}>
                {filteredLocations.length === 0 ? (
                    <Typography align="center" sx={{ width: "100%" }}>
                        No locations found.
                    </Typography>
                ) : (
                    filteredLocations.map((location) => (
                        <Grid item xs={12} sm={6} md={viewMode === "grid" ? 4 : 12} key={location.id}>
                            <Paper elevation={3} sx={{ borderRadius: 2, display: "flex", flexDirection: "row", padding: 2, alignItems: "center" }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" fontWeight="bold" color="primary">
                                        {location.city}, {location.state}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">Temp: {location.temperature}°F</Typography>
                                    <Typography variant="body2" color="textSecondary">Humidity: {location.humidity}%</Typography>
                                    <Typography variant="body2" color="textSecondary" fontWeight="bold">
                                        Weather: {location.condition}
                                    </Typography>
                                </CardContent>

                                {/* Action Icons */}
                                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <IconButton onClick={() => toggleFavorite(location.id)} color={location.isFavorite ? "error" : "default"}>
                                        {location.isFavorite ? <Favorite /> : <FavoriteBorder />}
                                    </IconButton>
                                    <IconButton onClick={() => removeLocation(location.id)} color="default">
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Grid>
                    ))
                )}
            </Grid>

            {/* Snackbar Notification */}
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={2000}
                onClose={() => setSnackbarMessage(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success">{snackbarMessage}</Alert>
            </Snackbar>
        </Box>
    );
};

export default FavoriteLocations;
