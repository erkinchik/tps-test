import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { login } from '../api/auth';

type AuthFormProps = {
    onLogin: (token: string) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleLogin = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const { access_token } = await login(values.email, values.password);
            messageApi.open({
                type: 'success',
                content: 'Успешный вход!',
            });
            onLogin(access_token);
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Ошибка авторизации. Проверьте email и пароль.',
            });
        }
        setLoading(false);
    };

    return (
        <>
            {contextHolder}
            <Form layout="vertical" onFinish={handleLogin} style={{ marginTop: 16 }}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: 'email', message: 'Введите email' }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль' }]}
                >
                    <Input.Password size="large" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AuthForm;
