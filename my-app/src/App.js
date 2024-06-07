// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import ActivityHeatmap from './Components/ActivityHeatMap';
import ActivityBarChart from './Components/ActivityBarChart';
import activityData from './data/developer_activity.json';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(activityData);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Developer Activity Dashboard</h1>
            </header>
            <div className="dashboard">
                {data.length > 0 ? (
                    <>
                        <ActivityHeatmap data={data} />
                        <ActivityBarChart data={data} />
                    </>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </div>
    );
}

export default App;
