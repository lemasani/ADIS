import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Utils/useAuth';
import  updateTime  from '../Utils/weatherUpdator'; // Adjust the path as necessary

import Chart from 'chart.js/auto';

export default function Dashboard() {
    useAuth()
    const temperatureChartRef = useRef(null);
    const humidityChartRef = useRef(null);
    const [chartData, setChartData] = useState({ averages: { temperature: 0, humidity: 0 }, chartData: [] });
    const [temperatureChart, setTemperatureChart] = useState(null);
    const [humidityChart, setHumidityChart] = useState(null);


    useEffect(() => {
        const weatherUpdate = updateTime(); // Call the updated function
        setChartData(weatherUpdate); // Update state with new data

        const ctxLine = temperatureChartRef.current.getContext('2d');
        const ctxBar = humidityChartRef.current.getContext('2d');

        // Destroy previous instances if they exist
        if (temperatureChart) {
            temperatureChart.destroy();
        }
        if (humidityChart) {
            humidityChart.destroy();
        }

        // Temperature Chart
        const newTemperatureChart = new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: weatherUpdate.chartData.map(data => data.time),
                datasets: [{
                    label: 'Temperature',
                    data: weatherUpdate.chartData.map(data => data.temp),
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {}
        });
        setTemperatureChart(newTemperatureChart);

        // Humidity Chart
        const newHumidityChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: weatherUpdate.chartData.map(data => data.time),
                datasets: [{
                    label: 'Humidity',
                    data: weatherUpdate.chartData.map(data => data.humidity),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {}
        });
        setHumidityChart(newHumidityChart);

        // Cleanup function to destroy charts when component unmounts
        return () => {
            if (newTemperatureChart) newTemperatureChart.destroy();
            if (newHumidityChart) newHumidityChart.destroy();
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className='container'>
           <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
            <div style={{ padding: '20px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                    <div className="card-tite font-bold text-center">
                        <span>Average Temperature</span>
                    </div>
                    <div className="card-item text-blue-700 text-center">{chartData.averages.temperature.toFixed(2)}°C
                    </div>
                </div>
            </div>
            <div style={{ padding: '20px',backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="card-body">
                    <div className="card-tite font-bold text-center">
                        Average Humidity:
                    </div>
                    <div className="card-item text-orange-700 text-center">
                        {chartData.averages.humidity}%
                    </div>
                </div>
            </div>
        </div>

            <div className="charts-container grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <canvas id="myLineChart" ref={temperatureChartRef}></canvas>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <canvas id="myBarChart" ref={humidityChartRef}></canvas>
                </div>
            </div>
        </div>
    );
}