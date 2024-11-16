import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Paper, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

// Snackbar Alert Component
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        const loginData = { username, password };

        try {
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();

            if (response.ok) { // Successful login
                setSuccessMessage(`Welcome, ${username}!`);
                setSuccess(true);
                setUsername('');
                setPassword('');

                // Update login status in context
                login({ username });

                // Redirect to HomeScreen
                navigate('/');
            } else {
                // Handle error messages (e.g., already logged in)
                setError(data.message || "Invalid credentials.");
            }
        } catch (error) {
            console.error("Network error:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <Container style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px', maxWidth: 400, margin: '0 auto' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleLogin} noValidate autoComplete="off">
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>

            {/* Error Snackbar */}
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>

            {/* Success Snackbar */}
            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
