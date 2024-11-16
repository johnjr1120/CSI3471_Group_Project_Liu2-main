import React, { useState, useEffect } from 'react';

export default function SessionStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8080/session/check", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setIsLoggedIn(result.isLoggedIn);
      } else {
        setIsLoggedIn(false); // If the response isn't ok, assume not logged in
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setIsLoggedIn(false); // On error, assume not logged in
    }
  };

  useEffect(() => {
    checkSession(); // Initial check on component load

    // Set up an interval to check the session status every 10 seconds
    const interval = setInterval(checkSession, 10000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []); // No dependency on `isLoggedIn` to prevent multiple intervals

  return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        padding: '10px',
        backgroundColor: '#eee',
        border: '1px solid #ccc',
        zIndex: 1000, // Ensure it's on top of other elements
      }}>
        <strong>Session Status:</strong> {isLoggedIn ? 'Logged In' : 'Logged Out'}
      </div>
  );
}
