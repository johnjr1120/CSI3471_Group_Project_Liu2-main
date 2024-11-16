import React, { useState } from 'react';
import { Container, Paper, Button, Snackbar, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    width: 600,
    margin: "20px auto",
    '& > *': {
        margin: theme.spacing(1),
    },
}));

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const CreateAccount = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (!name || !email || !username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            // Check if email or username is taken
            const checkResponse = await fetch("http://localhost:8080/user/checkEmailAndUsername", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username }),
            });

            if (!checkResponse.ok) {
                console.error(`Status: ${checkResponse.status}`);
                setError("Username or Email is already taken.");
                return;
            }

            // If available, proceed to create the account
            const user = { name, email, username, password };
            const response = await fetch("http://localhost:8080/user/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error("Failed to create account.");

            setSuccess(true);
            setName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error("Error in account creation:", error);
            setError("An error occurred while creating the account.");
        }
    };


    return (
        <Container style={{ marginTop: '100px' }}>
            <StyledPaper elevation={3}>
                <h1 style={{ color: "black" }}><u>Create Account</u></h1>
                <form noValidate autoComplete="off">
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>
            </StyledPaper>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success">Account created successfully!</Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateAccount;
