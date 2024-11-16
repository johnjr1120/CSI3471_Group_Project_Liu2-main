import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Container, Paper, Button, Snackbar, FormControlLabel, Checkbox } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ReservationForm from './ReservationForm';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '50px',
  width: 600,
  margin: "20px auto",
  '& > *': {
    margin: theme.spacing(1),
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Rooms() {
  const [numBeds, setNumBeds] = useState('');
  const [bedType, setBedType] = useState('');
  const [roomType, setRoomType] = useState('');
  const [smokingStatus, setSmokingStatus] = useState(false);
  const [floor, setFloor] = useState('');
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [viewingReservations, setViewingReservations] = useState(false);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (!numBeds || !bedType || !roomType || floor === '') {
      setError("Please fill in all fields.");
      return;
    }

    const room = {
      details: {
        numBeds: parseInt(numBeds, 10),
        bedType,
        roomType,
        smokingStatus,
        floor: parseInt(floor, 10)
      }
    };

    try {
      const response = await fetch("http://localhost:8080/room/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room)
      });

      if (!response.ok) throw new Error("Failed to add room");

      setSuccess(true);
      setNumBeds('');
      setBedType('');
      setRoomType('');
      setSmokingStatus(false);
      setFloor('');

      await fetchRooms();  
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the room.");
    }
  };

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/room/getAll");
      if (!res.ok) throw new Error("Failed to fetch rooms");

      const result = await res.json();
      setRooms(result);  
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching rooms.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllReservations = async () => {
    try {
      const response = await fetch("http://localhost:8080/reservation/getAllReservations");
      if (!response.ok) throw new Error("Failed to fetch reservations");

      const result = await response.json();
      setReservations(result);
      setViewingReservations(true); 
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching reservations.");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
      <Container style={{ marginTop: '100px' }}>
        <StyledPaper elevation={3}>
          <h1 style={{ color: "blue" }}><u>Add Room</u></h1>
          <form noValidate autoComplete="off">
            <TextField
                label="Number of Beds"
                variant="outlined"
                fullWidth
                value={numBeds}
                onChange={(e) => setNumBeds(e.target.value)}
                type="number"
            />
            <TextField
                label="Bed Type"
                variant="outlined"
                fullWidth
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
            />
            <TextField
                label="Room Type"
                variant="outlined"
                fullWidth
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
            />
            <FormControlLabel
                control={
                  <Checkbox
                      checked={smokingStatus}
                      onChange={(e) => setSmokingStatus(e.target.checked)}
                  />
                }
                label="Smoking Allowed"
            />
            <TextField
                label="Floor"
                variant="outlined"
                fullWidth
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                type="number"
            />
            <Button variant="contained" color="secondary" onClick={handleAddRoom}>
              Submit
            </Button>
          </form>
        </StyledPaper>

        <h1>Rooms</h1>
        {loading ? (
            <p>Loading rooms...</p>
        ) : (
            <StyledPaper elevation={3}>
              {rooms.map(room => (
                  <Paper
                      elevation={6}
                      style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                      key={room.id}>
                    <strong>Id:</strong> {room.id}<br />
                    <strong>Number of Beds:</strong> {room.details?.numBeds}<br />
                    <strong>Bed Type:</strong> {room.details?.bedType}<br />
                    <strong>Room Type:</strong> {room.details?.roomType}<br />
                    <strong>Smoking Allowed:</strong> {room.details?.smokingStatus ? "Yes" : "No"}<br />
                    <strong>Floor:</strong> {room.details?.floor}<br />
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={() => setSelectedRoom(room)}
                      style={{ marginTop: '10px' }}
                    >
                      Reserve
                    </Button>
                  </Paper>
              ))}
            </StyledPaper>
        )}

        <Button 
          variant="contained" 
          color="secondary" 
          style={{ margin: "20px auto", display: "block" }}
          onClick={fetchAllReservations}
        >
          View All Reservations
        </Button>

        {viewingReservations && (
          <StyledPaper elevation={3}>
            <h2>All Reservations</h2>
            {reservations.length > 0 ? (
              reservations.map(reservation => (
                <Paper
                  key={reservation.id}
                  elevation={6}
                  style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                >
                  <strong>Reservation ID:</strong> {reservation.id}<br />
                  <strong>Room ID:</strong> {reservation.roomId}<br />
                  <strong>Guest ID:</strong> {reservation.guest?.id || "N/A"}<br />
                  <strong>Guest Name:</strong> {reservation.guest?.name || "N/A"}<br />
                  <strong>Check-in Date:</strong> {new Date(reservation.checkInDate).toLocaleDateString()}<br />
                  <strong>Check-out Date:</strong> {new Date(reservation.checkOutDate).toLocaleDateString()}
                </Paper>
              ))
            ) : (
              <p>No reservations found.</p>
            )}
          </StyledPaper>
        )}

        {selectedRoom && (
          <ReservationForm 
            room={selectedRoom} 
            onClose={() => setSelectedRoom(null)} 
            onSuccess={() => {
              setSuccess(true);
              setSelectedRoom(null); 
            }}
          />
        )}

        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert onClose={() => setError(null)} severity="error">{error}</Alert>
        </Snackbar>
        <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
          <Alert onClose={() => setSuccess(false)} severity="success">Operation successful!</Alert>
        </Snackbar>
      </Container>
  );
}
