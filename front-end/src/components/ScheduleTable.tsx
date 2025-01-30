import React, { useState, useEffect } from 'react';
import { Table, TimePicker, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import { getSchedule, updateSchedule } from '../api/schedule';
import {DAYS_OF_WEEK} from "../utils/consts";
import {ScheduleItem} from "../utils/types/types";

type Props = {
    token: string;
};


const ScheduleTable: React.FC<Props> = ({ token }) => {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        loadSchedule();
    }, []);

    const loadSchedule = async () => {
        setLoading(true);
        try {
            const data = await getSchedule(token);
            setSchedule(data);
            messageApi.open({
                type: 'success',
                content: 'Расписание загружено!',
            });
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Ошибка загрузки расписания',
            });
        }
        setLoading(false);
    };

    const handleTimeChange = (value: Dayjs | null, day: number, field: keyof ScheduleItem) => {
        setSchedule((prev) =>
            prev.map((item) =>
                item.dayOfWeek === day ? { ...item, [field]: value ? value.format('HH:mm') : '00:00' } : item
            )
        );
    };


    const saveChanges = async () => {
        setLoading(true);
        try {
            await updateSchedule(token, schedule);
            messageApi.open({
                type: 'success',
                content: 'Расписание обновлено!',
            });
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Ошибка обновления расписания',
            });
        }
        setLoading(false);
    };

    const columns: ColumnsType<any> = [
        {
            title: 'День недели',
            dataIndex: 'dayOfWeek',
            key: 'dayOfWeek',
            render: (day: number) => DAYS_OF_WEEK[day],
        },
        {
            title: 'Начало',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text, record) => (
                <TimePicker
                    value={text ? dayjs(text, 'HH:mm') : null}
                    format="HH:mm"
                    onChange={(value) => handleTimeChange(value, record.dayOfWeek, 'startTime')}
                />
            ),
        },
        {
            title: 'Конец',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text, record) => (
                <TimePicker
                    value={text ? dayjs(text, 'HH:mm') : null}
                    format="HH:mm"
                    onChange={(value) => handleTimeChange(value, record.dayOfWeek, 'endTime')}
                />
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Table dataSource={schedule} columns={columns} rowKey="dayOfWeek" loading={loading} style={styles.table} />
            <Button type="primary" onClick={saveChanges} style={styles.saveButton} loading={loading}>
                Сохранить
            </Button>
        </>
    );
};

const styles = {
    table: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    saveButton: {
        marginTop: 16,
        display: 'block',
        width: '100%',
    },
};

export default ScheduleTable;
