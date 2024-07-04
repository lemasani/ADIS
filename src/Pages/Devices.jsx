// src/Pages/Devices.jsx
import { useEffect, useState } from 'react';
import { fetchDevices, updateDevice, deleteDevice } from '../Components/Endpoints';
import DeviceEditModal from '../Components/DeviceEditModal';
import DeviceDeleteModal from '../Components/DeviceDeleteModal';
import { useAuth } from '../Utils/useAuth';

export default function Devices() {
  useAuth()
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingDeviceId, setDeletingDeviceId] = useState(null);

  const [isLoading, setIsLoading] = useState(false); 


  const handleEditClick = (device) => {
    setEditingDevice(device);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedDevice) => {
    try {
        await updateDevice(updatedDevice.id, updatedDevice);
        // Update the device in your local state
        setDevices(devices.map(device => device.id === updatedDevice.id ? updatedDevice : device));
        setIsEditModalOpen(false);
    } catch (error) {
        console.error('Failed to update device:', error);
        // Handle error (e.g., show an error message)
    }
};

const handleDeleteConfirm = async (deviceId) => {
  try {
    await deleteDevice(deviceId);
    setDevices(devices.filter(device => device.id !== deviceId));
    setIsDeleteModalOpen(false);
  } catch (error) {
    console.error('Failed to delete device:', error);
    // Handle error (e.g., show an error message)
  }
};

useEffect(() => {
  const getDevices = async () => {
    setIsLoading(true); // Start loading
    try {
      const data = await fetchDevices();
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setIsLoading(false); // Stop loading regardless of the outcome
    }
  };
  getDevices();
}, []);
  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(filter.toLowerCase()) ||
      device.username.toLowerCase().includes(filter.toLowerCase()) ||
      device.ipAddress.includes(filter) ||
      device.sshPort.toString().includes(filter)
  );

  if (isLoading) {
    return <div>Loading devices...</div>; // Simple loading indicator
  }

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
                <button
                    onClick={() => handleEditClick(device)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setDeletingDeviceId(device.id); setIsDeleteModalOpen(true); }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                    Delete
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeviceEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        device={editingDevice}
        onSave={handleSave}
      />

      <DeviceDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteConfirm}
          deviceId={deletingDeviceId}
      />
    </>
  );
}
