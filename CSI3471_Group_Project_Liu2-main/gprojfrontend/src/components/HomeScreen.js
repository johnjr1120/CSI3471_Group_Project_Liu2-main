import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

const HomeScreen = () => {
    const navigate = useNavigate();

    const handleAddGuest = () => {
        navigate('/guest/');
    };

    const handleAddRoom = () => {
        navigate('/room/');
    };

    const handleAccountScreen = () => {
        navigate('/accountscreen/'); // Navigate to AccountScreen
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
                minHeight: '100vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxSizing: 'border-box',
                paddingTop: '89px',
                paddingBottom: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    height: '119vh',
                    marginBottom: '20px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 50,
                        display: 'flex',
                        gap: 10,
                        zIndex: 2,
                    }}
                >
                    {['Amenities', 'Events', 'Dining', 'Shopping', 'About Us', 'Reservations', 'Account'].map((label) => (
                        <Button
                            key={label}
                            variant="contained"
                            color="secondary"
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
                            onClick={() =>
                                label === 'Account'
                                    ? handleAccountScreen()
                                    : navigate(`/${label.toLowerCase().replace(' ', '')}`)
                            }
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                {/* Video Player */}
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=kVEOaFOnYlo"
                    width="100%"
                    height="100%"
                    playing
                    loop
                    muted
                    style={{ pointerEvents: 'none', zIndex: 1 }}
                />

                <Box
                    className="overlay"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />
            </Box>

            <Typography variant="h0" gutterBottom>
                NEW YORK, USA
            </Typography>
            <Typography variant="h3" gutterBottom>
                The Synergy Suites at New York
            </Typography>
            <Typography variant="h4" gutterBottom align="center">
                A peaceful blend of nature, modern design, and city life
            </Typography>
            <Typography variant="h6" gutterBottom align="center">
                Welcome to a serene retreat nestled in the heart of the bustling city. Our hotel invites you to experience a soothing blend of the outdoors, contemporary style, and urban vibes. Each of our three stories offers a unique atmosphere: the ground floor embraces the tranquility of nature with lush greenery and calming decor, while the second floor showcases sleek modern designs that prioritize comfort and convenience. The top floor immerses you in the vibrant energy of urban life, providing stunning city views that inspire relaxation and exploration. Whether you’re seeking a peaceful escape or a lively adventure, our hotel is the perfect place to unwind and recharge amidst the lively pulse of city life.
            </Typography>
            <Typography variant="h3" gutterBottom>
                Home Screen And Directories Testing
            </Typography>
            <Typography variant="h5" gutterBottom>
                Please select an option:
            </Typography>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleAddGuest}>
                Add Guest
            </Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleAddRoom}>
                Add Room
            </Button>
        </Box>
    );
};

export default HomeScreen;
