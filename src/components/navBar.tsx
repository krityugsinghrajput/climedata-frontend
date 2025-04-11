import React, { useState, useCallback } from 'react'; // Import core React functionality and hooks
import { AppBar, Toolbar, Typography, Box, Button, Menu, MenuItem } from '@mui/material'; // Import Material-UI components for styling
import { Link } from 'react-router-dom'; // Import Link component for client-side navigation
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Icon for dropdown menus
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Sun icon for the weather app's branding

// Interface for navigation links
interface NavLink {
    text: string; // Text to display in the navbar
    path: string; // Path for the link
    menuOptions: { label: string; path: string }[]; // Optional dropdown menu options
}

// NavBar component definition
const NavBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for tracking the anchor element of an open menu
    const [activeMenu, setActiveMenu] = useState<{ label: string; path: string }[] | null>(null); // State for tracking the currently active menu

    // Navigation links with optional dropdown menus
    const navLinks: NavLink[] = [
        { text: 'Home', path: '/', menuOptions: [] },
        { text: 'Search', path: '/search', menuOptions: [] },
        { text: 'Request New Location', path: '/request-new-location', menuOptions: [] },
        {
            text: 'Documentation',
            path: '/docs',
            menuOptions: [

            ]
        },

        {
            text: 'Special Features',
            path: '/dropdown-menu',
            menuOptions: [
                { label: 'Favorite Locations', path: '/favorites' },
                { label: 'Historical Trends', path: '/historical-trend' },
                { label: 'Temperature Toggle', path: '/temp-toggle' },
                { label: 'Forecast List', path: '/forecast-list' },
                { label: 'Weather Background', path: '/weather-background' },
            ]
        },

        { text: 'App Info', path: '/app-info', menuOptions: [] }
    ];

    // Opens the dropdown menu for a given set of options
    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>, menuType: { label: string; path: string }[]) => {
        event.preventDefault(); // Prevent default anchor behavior
        setAnchorEl(event.currentTarget); // Set the clicked element as the anchor
        setActiveMenu(menuType); // Set the active menu options
    }, []);

    // Closes the currently open dropdown menu
    const handleClose = useCallback(() => {
        setAnchorEl(null); // Clear the anchor element
        setActiveMenu(null); // Clear the active menu
    }, []);

    // Renders the dropdown menu with links
    const renderDropdownMenu = (menuOptions: { label: string; path: string }[]) => (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ boxShadow: 3, borderRadius: 2 }}>
            {menuOptions.map((option, index) => (
                <MenuItem
                    key={index}
                    component={Link}
                    to={option.path}
                    onClick={handleClose}
                    sx={{
                        color: '#ba0c2f',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: '#a7b1b7',
                            color: '#ffffff',
                        },
                    }}
                >
                    {option.label}
                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ba0c2f', color: '#ffffff' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
                {/* Logo and brand name */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <WbSunnyIcon sx={{ color: '#ffffff', marginRight: '10px' }} />
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        sx={{
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontWeight: 600,
                            letterSpacing: 2,
                        }}
                    >
                        ClimeData
                    </Typography>
                </Box>

                {/* Navigation links */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {navLinks.map((link, index) => (
                        <Button
                            key={index}
                            onClick={(event: React.MouseEvent<HTMLElement>) =>
                                link.menuOptions.length > 0 && handleClick(event, link.menuOptions)
                            }
                            component={link.menuOptions.length > 0 ? 'button' : Link}
                            to={link.menuOptions.length === 0 ? link.path : undefined}
                            sx={{
                                color: '#ffffff',
                                textTransform: 'none',
                                fontWeight: 400,
                                marginRight: '15px',
                                '&:hover': {
                                    fontWeight: 600,
                                    color: '#a7b1b7',
                                },
                            }}
                        >
                            {link.text}
                            {link.menuOptions.length > 0 && <KeyboardArrowDownIcon />}
                        </Button>
                    ))}
                    {activeMenu && renderDropdownMenu(activeMenu)}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar; // Export NavBar component
