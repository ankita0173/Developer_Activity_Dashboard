// src/components/ActivityHeatmap.js
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const ActivityHeatmap = ({ data }) => {
    const [heatmapData, setHeatmapData] = useState(null);

    useEffect(() => {
        const transformedData = transformData(data);
        setHeatmapData(transformedData);
    }, [data]);

    const transformData = (data) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const heatmap = days.reduce((acc, day) => {
            acc[day] = Array(24).fill(0);
            return acc;
        }, {});

        data.forEach(({ timestamp, activity_type }) => {
            const date = new Date(timestamp);
            const day = days[date.getDay()];
            const hour = date.getHours();
            heatmap[day][hour] += 1;
        });

        return {
            labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
            datasets: Object.keys(heatmap).map((day, index) => ({
                label: day,
                data: heatmap[day],
                backgroundColor: `rgba(${(index + 1) * 50}, 99, 132, 0.2)`,
                borderColor: `rgba(${(index + 1) * 50}, 99, 132, 1)`,
                borderWidth: 1,
            })),
        };
    };

    return (
        <div className="chart-container">
            <h2>Activity Heatmap</h2>
            {heatmapData ? <Line data={heatmapData} /> : <p>Loading chart...</p>}
        </div>
    );
};

export default ActivityHeatmap;
