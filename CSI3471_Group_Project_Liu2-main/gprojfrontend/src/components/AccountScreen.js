import React, { useContext } from 'react';
// import { Container, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import UserContext from './UserContext';

const AccountScreen = () => {
    // const { user, logout } = useContext(UserContext);
    // const navigate = useNavigate(); // Hook for navigation

    // const handleLogout = () => {
    //     logout();
    //     navigate('/'); // Redirect to home screen after logout
    // };

    // if (!user) return <Typography>Please log in to view account details.</Typography>;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0', // Optional background color
        }}>
            <h1>Hello World</h1>
        </div>
    );
};

export default AccountScreen;
