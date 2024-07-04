import { useAuth } from "../Utils/useAuth";



const FarmMonitoring = () => {
  useAuth()
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AUTOMATE AND MONITOR YOUR FARM</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Watering Schedule (Zone 1)</h2>
        <div className="flex items-center space-x-2">
          <input type="time" className="border p-2 rounded" />
          <input type="number" placeholder="Duration (minutes)" className="border p-2 rounded" />
          <button className="bg-gray-200 p-2 rounded">Save Schedule</button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="border p-4 rounded mb-4">
          <p>Soil Moisture: 1 (Dry)</p>
          <p>Water Usage: 0 L</p>
          <p>Status: Idle</p>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button className="bg-green-200 p-6 rounded flex-1 text-center">
          <div className="text-2xl">📅</div>
          <div>Watering Schedule</div>
        </button>
        <button className="bg-green-200 p-6 rounded flex-1 text-center">
          <div className="text-2xl">📶</div>
          <div>Sensor Monitoring</div>
        </button>
        <button className="bg-green-200 p-6 rounded flex-1 text-center">
          <div className="text-2xl">💧</div>
          <div>Water Usage</div>
        </button>
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Watering Scheduling</h2>
        <p>The water pump is scheduled to be switched on:</p>
        <ul className="list-disc pl-6">
          <li>Morning: 6:00 AM</li>
          <li>Evening: 6:00 PM</li>
        </ul>
      </div>
    </div>
  );
};

export default FarmMonitoring;
