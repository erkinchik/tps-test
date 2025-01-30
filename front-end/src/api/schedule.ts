import axios from 'axios';

import {API_URL} from "../utils/consts";
import {ScheduleItem} from "../utils/types/types";

export const getSchedule = async (token: string): Promise<ScheduleItem[]> => {
    const res = await axios.get<ScheduleItem[]>(`${API_URL}/schedule`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const updateSchedule = async (token: string, schedule: ScheduleItem[]): Promise<void> => {
    await axios.put(`${API_URL}/schedule`, { schedule }, { // ✅ Оборачиваем в объект
        headers: { Authorization: `Bearer ${token}` },
    });
};
