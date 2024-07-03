import PropTypes from 'prop-types';
// src/Components/DeviceEditModal.jsx

export default function DeviceEditModal({ isOpen, onClose, device, onSave }) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Collect form data and call onSave
    const updatedDevice = {
      ...device,
      name: event.target.name.value,
      username: event.target.username.value,
      ipAddress: event.target.ipAddress.value,
      sshPort: event.target.sshPort.value,
    };
    onSave(updatedDevice);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium">Edit Device</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Device Name</label>
          <input
            defaultValue={device.name}
            name="name"
            placeholder="Device Name"
            className="w-full p-2 border border-gray-400 rounded mb-3"
          />
          <label htmlFor="username">Username</label>
          <input
            defaultValue={device.username}
            name="username"
            placeholder="Username"
            className="w-full p-2 border border-gray-400 rounded mb-3"
          />
          <label htmlFor="ipAddress">Ip Address</label>
          <input
            defaultValue={device.ipAddress}
            name="ipAddress"
            placeholder="IP Address"
            className="w-full p-2 border border-gray-400 rounded mb-3"
          />
          <label htmlFor="sshPort">SSH Port</label>
          <input
            defaultValue={device.sshPort}
            name="sshPort"
            placeholder="SSH Port"
            type="number"
            className="w-full p-2 border border-gray-400 rounded mb-3"
          />

          <div className="button-container flex justify-between">
            <button type="submit" className="button bg-teal-700 p-3 rounded">
                Save
            </button>
            <button onClick={onClose} className="button bg-red-400 p-3 rounded">
                Cancel
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

DeviceEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  device: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    ipAddress: PropTypes.string,
    sshPort: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};
