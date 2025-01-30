import axios from 'axios';
import {API_URL} from "../utils/consts";
import {AuthResponse} from "../utils/types/types";


export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
    return res.data;
};
