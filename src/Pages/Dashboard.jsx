import { useEffect, useRef, useState } from 'react';
import { fetchWeatherData } from '../Components/Endpoints';

import Chart from 'chart.js/auto';

export default function Dashboard() {
    const [weatherData, setWeatherData] = useState({ temperature: '', humidity: '', moisture: '' });
    const temperatureChartRef = useRef(null)
    const humidityChartRef = useRef(null)

  useEffect(() => {
    fetchWeatherData().then(data => {
      setWeatherData(data);
    }).catch(error => console.error(error));
    const ctxLine = document.getElementById('myLineChart').getContext('2d');
    const ctxBar = document.getElementById('myBarChart').getContext('2d');

     // Destroy previous instances if they exist
     if (temperatureChartRef.current) {
        temperatureChartRef.current.destroy();
      }
      if (humidityChartRef.current) {
        humidityChartRef.current.destroy();
      }

    temperatureChartRef.current = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: 'Temperature',
          data: [0, 0, 0, 0, 0, 0, 0], // Initial data, should be updated with actual data
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    
    humidityChartRef.current = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: 'Humidity',
          data: [0, 0, 0, 0, 0, 0, 0], // Initial data, should be updated with actual data
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Function to update charts
    const updateCharts = () => {
        fetchWeatherData().then(data => {
          console.log('data',data); // For debugging
          if (temperatureChartRef.current && humidityChartRef.current && data.temperature && data.humidity) {
            temperatureChartRef.current.data.datasets[0].data = [data.temperature];
            humidityChartRef.current.data.datasets[0].data = [data.humidity];
            temperatureChartRef.current.update();
            humidityChartRef.current.update();
          } else {
            console.error('Data is not in the expected format:', data);
          }
        }).catch(error => console.error(error));
      };

    // Update charts every 5 seconds
    const intervalId = setInterval(updateCharts, 5000);

    // Cleanup interval on component unmount
    return () => {
        clearInterval(intervalId);
        if (temperatureChartRef.current) {
          temperatureChartRef.current.destroy();
        }
        if (humidityChartRef.current) {
          humidityChartRef.current.destroy();
        }
      };
  }, []);

  return (

    <>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
        <div className="card p-10 shadow rounded bg-slate-50">
            <div className="card-body">
            <h5 className="card-title font-bold mb-4 text-center">Temperature</h5>
            <p className="card-text text-center text-teal-700">{weatherData.temperature}°C</p>
            </div>
        </div> 
        <div className="card p-10 shadow rounded  bg-slate-50">
            <div className="card-body">
            <h5 className="card-title font-bold mb-4  text-center">Humidity</h5>
            <p className="card-text text-center text-blue-700">{weatherData.humidity}%</p>
            </div>
        </div>
        <div className="card p-10 shadow rounded  bg-slate-50">
            <div className="card-body"> 
            <h5 className="card-title font-bold mb-4  text-center">Moisture</h5>
            <p className="card-text text-center text-orange-700">{weatherData.moisture}</p>
            </div>
        </div>
        </div>

        <section className="charts-section mt-10 flex gap-10 justify-between">
            <div className="line-chart">
                <canvas id="myLineChart"></canvas>
            </div>
            <div className="bar-chart mt-8">
                <canvas id="myBarChart"></canvas>
            </div>
      </section>
    
    </>
  );
}