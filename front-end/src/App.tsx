import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SchedulePage from './pages/SchedulePage';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

    const handleLogin = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to={token ? "/schedule" : "/login"} />} />

                <Route path="/login" element={<AuthPage onLogin={handleLogin} />} />

                <Route
                    path="/schedule"
                    element={token ? <SchedulePage token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
