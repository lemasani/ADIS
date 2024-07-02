// src/Components/Endpoints.jsx
import axios from '../Utils/axios';
import { generateUUID } from '../Utils/UuidGenerator';

export async function submitRegistration(userData) {
    try {
      // Generate a UUID for the user data
      const uuid = generateUUID();
      const userDataWithUUID = { ...userData, uuid };

      // Use Axios to submit registration data
      const response = await axios.post('/users', userDataWithUUID, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Axios automatically parses the JSON response, so you can directly return the data
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
}


export async function login(userData) {
    try {
      const response = await axios.post('/auth', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }



export async function fetchWeatherData() {
        try {
        const response = await axios.get("https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=IZQ3NrnWlC20dHlbtfVp0fnWza2X6it3", {
            headers: {
            "Content-Type": "application/json",
            },
        });
        const currentData = response.data.timelines.minutely[0].values;
        return {
            temperature: currentData.temperature,
            humidity: currentData.humidity,
            moisture: currentData.humidity > 50 ? "WET" : "DRY",
        };
        } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
}


// Add this function to src/Components/Endpoints.jsx
export async function submitDeviceRegistration(deviceData) {
    try {
        // Generate a UUID for the device data
        const uuid = generateUUID();
        const deviceDataWithUUID = { ...deviceData, id: uuid };

        // Use Axios to submit device registration data
        const response = await axios.post('/devices', deviceDataWithUUID, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Axios automatically parses the JSON response, so you can directly return the data
        return response.data;
    } catch (error) {
        console.error('Error during device registration:', error);
        throw error;
    }
}