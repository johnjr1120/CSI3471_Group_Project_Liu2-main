import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    width: 600,
    margin: "20px auto",
    '& > *': {
        margin: theme.spacing(1),
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Guest() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        if (!name || !email || !username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // First, check if the email or username is already taken
        fetch("http://localhost:8080/user/checkEmailAndUsername", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.exists) {
                    setError("Username or Email is already taken.");
                } else {
                    // If the username or email is not taken, proceed with adding the guest
                    addGuest();
                }
            })
            .catch((error) => {
                console.error(error);
                setError("An error occurred while checking availability.");
            });
    };

    const addGuest = () => {
        const guest = { name, email, username, password };

        fetch("http://localhost:8080/user/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(guest)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add guest");
                }
                return response.json();
            })
            .then(() => {
                console.log("New Guest added");
                setSuccess(true);
                setName('');
                setEmail('');
                setUsername('');
                setPassword('');
                fetchGuests();
            })
            .catch((error) => {
                console.error(error);
                setError("An error occurred while adding the guest.");
            });
    };

    const fetchGuests = () => {
        fetch("http://localhost:8080/user/getAll")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch guests");
                }
                return res.json();
            })
            .then((result) => {
                setGuests(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("An error occurred while fetching guests.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    return (
        <Container style={{ marginTop: '100px' }}>
            <StyledPaper elevation={3}>
                <h1 style={{ color: "black" }}><u>Add Guest</u></h1>
                <form noValidate autoComplete="off">
                    <TextField
                        label="Guest Name"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Guest Email"
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
            <h1>Guests</h1>
            {loading ? (
                <p>Loading guests...</p>
            ) : (
                <StyledPaper elevation={3}>
                    {guests.map(guest => (
                        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={guest.id}>
                            Id: {guest.id}<br />
                            Name: {guest.name}<br />
                            Email: {guest.email}<br />
                            Username: {guest.username}<br />
                            Password: {guest.password}
                        </Paper>
                    ))}
                </StyledPaper>
            )}
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                <Alert onClose={() => setSuccess(false)} severity="success">New Guest added successfully!</Alert>
            </Snackbar>
        </Container>
    );
}
