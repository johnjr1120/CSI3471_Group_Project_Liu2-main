import React, { useState, useEffect } from 'react';

const RoomList = ({ onRoomSelect }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/rooms/search?isAvailable=true')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch rooms');
                return response.json();
            })
            .then(data => {
                setRooms(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading rooms...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Available Rooms</h2>
            <div style={{ overflowY: 'scroll', maxHeight: '300px' }}>
                {rooms.map(room => (
                    <div 
                        key={room.id}
                        onClick={() => onRoomSelect(room)}
                        style={{ 
                            border: '1px solid #ccc', 
                            padding: '10px', 
                            margin: '5px 0', 
                            cursor: 'pointer' 
                        }}
                    >
                        <h3>Room {room.id}</h3>
                        <p>Type: {room.roomDetails.roomType}</p>
                        <p>Beds: {room.roomDetails.numBeds}</p>
                        <p>Floor: {room.roomDetails.floor}</p>
                        <p>Price: ${room.price}</p>
                        <p>Smoking: {room.roomDetails.smokingStatus ? 'Yes' : 'No'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomList;

