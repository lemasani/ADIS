// src/Pages/Devices.jsx
import { useEffect, useState } from 'react';
import { fetchDevices } from '../Components/Endpoints';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getDevices = async () => {
      const data = await fetchDevices();
      setDevices(data);
    };
    getDevices();
  }, []);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(filter.toLowerCase()) ||
    device.username.toLowerCase().includes(filter.toLowerCase()) ||
    device.ipAddress.includes(filter) ||
    device.sshPort.toString().includes(filter)
  );

  return (
    <>
      <h1 className="text-2xl font-bold">Devices</h1>
      <p className="text-gray-700">List of devices</p>
      <input
        type="text"
        placeholder="Filter devices..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Device Name</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">IP Address</th>
              <th className="border px-4 py-2">SSH Port</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => (
              <tr key={device.id}>
                <td className="border px-4 py-2">{device.name}</td>
                <td className="border px-4 py-2">{device.username}</td>
                <td className="border px-4 py-2">{device.ipAddress}</td>
                <td className="border px-4 py-2">{device.sshPort}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Edit</button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2">View More</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}