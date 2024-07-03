import {weatherData} from './weather.js';

export default function updateTime() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hour}:${minutes}`;

    // Filter keys from 08:00 to currentTime
    const filteredKeys = Object.keys(weatherData).filter(time => time >= "08:00" && time <= currentTime);

    let tempSum = 0;
    let humiditySum = 0;
    const chartData = [];

    filteredKeys.forEach(time => {
        const { temp, humidity } = weatherData[time];
        console.log(`Time: ${time}, Temperature: ${temp}°C, Humidity: ${humidity}%`);
        tempSum += temp;
        humiditySum += humidity;
        chartData.push({ time, temp, humidity });
    });

    const dataCount = filteredKeys.length;
    const averageTemp = dataCount > 0 ? tempSum / dataCount : 0;
    const averageHumidity = dataCount > 0 ? humiditySum / dataCount : 0;

    if (dataCount === 0) {
        console.log(`No weather data available for ${currentTime}`);
    }

    return {
        chartData,
        averages: {
            temperature: averageTemp,
            humidity: averageHumidity,
        },
    };
}

// Example usage
const weatherUpdate = updateTime();
console.log(weatherUpdate.chartData); // For chart
console.log(weatherUpdate.averages); // For card displays

// If you need to update this periodically, you can use setInterval with a function that handles the returned data.