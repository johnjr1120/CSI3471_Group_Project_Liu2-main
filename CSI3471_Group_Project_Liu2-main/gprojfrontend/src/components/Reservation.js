import React, { useState } from 'react';

const Reservation = ({ selectedRoom }) => {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [reservationStatus, setReservationStatus] = useState('');

    const handleReservation = () => {
        if (!selectedRoom) {
            setReservationStatus("Please select a room first.");
            return;
        }

        fetch('/reservation/reserveRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomId: selectedRoom.id,
                checkInDate,
                checkOutDate
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to make reservation');
            return response.json();
        })
        .then(data => {
            setReservationStatus('Reservation successful!');
        })
        .catch(error => {
            setReservationStatus(`Error: ${error.message}`);
        });
    };

    if (!selectedRoom) return <p>Please select a room to make a reservation.</p>;

    return (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>Make a Reservation</h2>
            <p>Selected Room: {selectedRoom.id}</p>
            <label>
                Check-in Date:
                <input 
                    type="date" 
                    value={checkInDate} 
                    onChange={(e) => setCheckInDate(e.target.value)} 
                />
            </label>
            <br />
            <label>
                Check-out Date:
                <input 
                    type="date" 
                    value={checkOutDate} 
                    onChange={(e) => setCheckOutDate(e.target.value)} 
                />
            </label>
            <br />
            <button onClick={handleReservation} style={{ marginTop: '15px', padding: '10px 20px', fontSize: '16px' }}>
                Reserve
            </button>
            {reservationStatus && <p>{reservationStatus}</p>}
        </div>
    );
};

export default Reservation;
