// src/components/ActivityBarChart.js
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ActivityBarChart = ({ data }) => {
    const transformData = (data) => {
        const activities = ['commit', 'pull_request_opened', 'merge', 'meeting', 'documentation'];
        const activityCounts = activities.reduce((acc, activity) => {
            acc[activity] = 0;
            return acc;
        }, {});

        data.forEach(({ activity_type }) => {
            activityCounts[activity_type] += 1;
        });

        return {
            labels: activities,
            datasets: [{
                label: 'Activity Count',
                data: activities.map(activity => activityCounts[activity]),
                backgroundColor: activities.map((_, index) => `rgba(${(index + 1) * 50}, 99, 132, 0.2)`),
                borderColor: activities.map((_, index) => `rgba(${(index + 1) * 50}, 99, 132, 1)`),
                borderWidth: 1,
            }],
        };
    };

    const chartData = transformData(data);

    return (
        <div className="chart-container">
            <h2>Activity Bar Chart</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default ActivityBarChart;
