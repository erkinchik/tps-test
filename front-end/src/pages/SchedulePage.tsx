import React from 'react';
import { Card, Button } from 'antd';
import ScheduleTable from '../components/ScheduleTable';

type Props = {
    token: string;
    onLogout: () => void;
};

const SchedulePage: React.FC<Props> = ({ token, onLogout }) => {
    const handleLogout = () => {
        onLogout();
    };

    return (
        <div style={styles.container}>
            <Card title="Расписание" style={styles.card}>
                <Button type="primary" onClick={handleLogout} danger style={{
                    float: 'right',
                    marginBottom: 10,
                }}>
                    Выйти
                </Button>
                <ScheduleTable token={token} />
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
        width: '80%',
        maxWidth: 800,
        borderRadius: 12,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        background: '#ffffff',
        padding: 16,
    },
};
export default SchedulePage;
