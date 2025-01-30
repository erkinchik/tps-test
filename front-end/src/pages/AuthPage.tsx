import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

type Props = {
    onLogin: (token: string) => void;
};

const AuthPage: React.FC<Props> = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLogin = (token: string) => {
        onLogin(token);
        navigate('/schedule');
    };

    return (
        <div style={styles.container}>
            <Card title="Вход в систему" style={styles.card}>
                <AuthForm onLogin={handleLogin} />
            </Card>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
    },
    card: {
        width: 400,
        borderRadius: 12,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        background: '#ffffff',
    },
};

export default AuthPage;
