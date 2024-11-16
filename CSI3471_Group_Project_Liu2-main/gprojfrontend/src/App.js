// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Guest from './components/guest';
import Rooms from './components/room';
import Login from './components/Login';
import HomeScreen from './components/HomeScreen';
import SessionStatus from './components/SessionStatus';
import CreateAccount from './components/CreateAccount';
import AccountScreen from './components/AccountScreen';
import { UserProvider } from './components/UserContext'; // Ensure path is correct

function App() {
    return (
        <UserProvider>
            <Router>
                <Appbar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path="/room" element={<Rooms />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/accountscreen" element={<AccountScreen />} />
                </Routes>
                <SessionStatus />
            </Router>
        </UserProvider>
    );
}

export default App;
