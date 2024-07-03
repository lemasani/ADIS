    import PropTypes from 'prop-types';
    export default function DeviceDeleteModal({
    isOpen,
    onClose,
    onDelete,
    deviceId,
    }) {
    if (!isOpen) return null;

    const handleDelete = () => {
        onDelete(deviceId);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium">Confirm Delete</h3>
            <p>Are you sure you want to delete this device?</p>
            <div className="button-container flex justify-between mt-4">
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
                Delete
            </button>
            <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    );
    }

    DeviceDeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    deviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    };
