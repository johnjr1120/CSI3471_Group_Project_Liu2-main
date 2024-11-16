import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Appbar() {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');  // Store the username of the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/session/check", {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setIsLoggedIn(result.isLoggedIn);

        if (result.isLoggedIn) {
          // Fetch the username if the user is logged in
          const userResponse = await fetch("http://localhost:8080/session/user", {
            method: "GET",
            credentials: "include",
          });
          const userData = await userResponse.json();
          setUsername(userData.username); // Store the username
        } else {
          setUsername('Guest'); // If not logged in, treat as Guest
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, []);

  const toggleDrawer = (side, open) => () => {
    if (side === 'left') {
      setLeftDrawerOpen(open);
    } else {
      setRightDrawerOpen(open);
    }
  };

  const handleLogout = async () => {
    await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setUsername('');  // Clear the username on logout
    setRightDrawerOpen(false);
    navigate("/login");
  };

  return (
      <Box>
        <AppBar
            position="fixed"
            sx={{
              backgroundColor: '#f0f0f0',
              borderBottom: '1px solid #ccc',
              boxShadow: 'none',
            }}
        >
          <Toolbar sx={{ height: '95px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            {/* Left Side - Menu Icon */}
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, fontSize: '30px' }}
                onClick={toggleDrawer('left', true)}
            >
              <MenuIcon sx={{ fontSize: 'inherit', color: '#333' }} />
            </IconButton>

            {/* Center - Hotel Name */}
            <Box sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}>
              <Typography variant="h4" sx={{ color: '#333' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  SYNERGY SUITES
                </Link>
              </Typography>
            </Box>

            {/* Right Side - Dynamic Greeting and Account Icon */}
            <Typography
                variant="h6"
                sx={{
                  color: '#333',
                  marginLeft: '1008px',
                  display: 'flex',
                  alignItems: 'center',
                }}
            >
              {isLoggedIn ? `Hello, ${username}` : 'Welcome, Guest'}
            </Typography>

            <IconButton
                edge="end"
                color="inherit"
                aria-label="account"
                sx={{ fontSize: '30px' }}
                onClick={toggleDrawer('right', true)}
            >
              <AccountCircleIcon sx={{ fontSize: 'inherit', color: '#333' }} />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
            anchor="left"
            open={leftDrawerOpen}
            onClose={toggleDrawer('left', false)}
        >
          {/* Left Drawer Content */}
        </Drawer>

        <Drawer
            anchor="right"
            open={rightDrawerOpen}
            onClose={toggleDrawer('right', false)}
        >
          {/* Right Drawer Content */}
        </Drawer>
      </Box>
  );
}
