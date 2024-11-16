// ReservationForm.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function ReservationForm({ room, onClose, onSuccess }) {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleReserve = async () => {
        if (!checkInDate || !checkOutDate || !username) {
            setError("Please fill in username, check-in, and check-out dates.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/reservation/reserveRoom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    roomId: room.id,
                    checkInDate,
                    checkOutDate,
                    username  // Send the username as part of the request
                })
            });

            const result = await response.json();

            if (result.status === "error") {
                setError(result.message || "An error occurred while reserving the room.");
            } else {
                onSuccess(); // Notify parent of success if reservation is successful
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while reserving the room.");
        }
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Reserve Room {room.id}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Check-in Date"
                    type="date"
                    fullWidth
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    style={{ marginBottom: '10px' }}
                />
                <TextField
                    label="Check-out Date"
                    type="date"
                    fullWidth
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleReserve} color="primary">Reserve</Button>
            </DialogActions>
        </Dialog>
    );
}
