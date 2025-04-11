import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    CssBaseline,
    Typography,
    Divider,
    Container,
    Toolbar,
    useTheme,
} from '@mui/material';

// -------------------------------------------------------------------
// Sidebar Drawer Width
// -------------------------------------------------------------------
const drawerWidth = 260;

// -------------------------------------------------------------------
// Documentation Sections Data
// -------------------------------------------------------------------
const sections = [
    {
        title: "Getting Started",
        content: `Welcome to ClimeData Documentation. This section provides an introduction to the application,
installation instructions, and an overview of the project's structure.
You can get started by following the quick start guide and exploring the features outlined in this documentation.`,
    },
    {
        title: "Historical Trends",
        content: `The Historical Trends page displays weather trends for multiple cities over a 7-day period.
It uses Material UI for layout and styling, Recharts for rendering responsive line charts, 
and react-loading-skeleton for displaying placeholder content during data load.
Each city's trends (temperature, humidity, and wind speed) are shown in widget cards for easy comparison.`,
    },
    {
        title: "Home Page",
        content: `The Home Page is the main entry point of the ClimeData app. It includes:
- A Hero Section with a gradient background, a welcome message, and a "Get Started" button linking to the Search Page.
- A Weather Forecast Section that displays current weather metrics using icons and cards.
- Additional sections for interactive map viewing, weather alerts, and company information.`,
    },
    {
        title: "Search Page",
        content: `The Search Page allows users to query weather data by selecting a state and city.
Key features include:
- Dropdown menus for state and city selection (with conditional enabling).
- A Temperature Range Slider for setting a preferred range.
- Radio buttons for unit selection (Fahrenheit or Celsius).
- Checkboxes for additional settings like hourly forecasts and weather alerts.
The page fetches weather data asynchronously with proper error handling and loading states.`,
    },
    // Add additional sections as needed.
];

/**
 * DocumentationPage Component
 * ---------------------------
 * This component renders a documentation page with a permanent left sidebar for navigation,
 * and a main content area on the right that displays the selected documentation content.
 * A <Toolbar /> placeholder is used to ensure that the sidebar begins right below the existing navbar.
 */
const DocumentationPage: React.FC = () => {
    // Use Material UI's theme for consistent styling.
    const theme = useTheme();

    // State to track the currently selected documentation section.
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    // Handler for sidebar item clicks to update the selected section.
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* CssBaseline to normalize styles across browsers */}
            <CssBaseline />

            {/* Permanent Left Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    // Styling for the sidebar paper
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: theme.palette.background.paper,
                        borderRight: `1px solid ${theme.palette.divider}`,
                    },
                }}
            >
                {/* Toolbar to offset the sidebar content below the existing navbar */}
                <Toolbar />
                <Box sx={{ overflow: 'auto', mt: 1 }}>
                    <List>
                        {sections.map((section, index) => (
                            <ListItemButton
                                key={section.title}
                                selected={selectedIndex === index}
                                onClick={() => handleListItemClick(index)}
                                // Add a left border to the selected item for visual feedback.
                                sx={{
                                    borderLeft: selectedIndex === index ? `4px solid ${theme.palette.primary.main}` : 'none',
                                    '&.Mui-selected': {
                                        backgroundColor: theme.palette.action.selected,
                                    },
                                }}
                            >
                                <ListItemText primary={section.title} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
                <Container maxWidth="md">
                    {/* Toolbar to create spacing for content relative to the navbar */}
                    <Toolbar />
                    {/* Section Title */}
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {sections[selectedIndex].title}
                    </Typography>
                    {/* Underline Divider */}
                    <Divider sx={{ mb: 2 }} />
                    {/* Section Content */}
                    <Typography variant="body1">
                        {sections[selectedIndex].content}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default DocumentationPage;
