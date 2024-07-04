import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RootLayout({ children }) {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate(); // Add this line to use the navigate function

  const handleLogout = () => {
      sessionStorage.removeItem('userData'); // Remove userData from sessionStorage
      navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">ADIS home</div>
          <nav>
            <a href="/dashboard" className="inline-block p-2">Dashboard</a>
            <div 
              className="inline-block p-2 relative"
              onMouseEnter={() => setShowPopover(true)}
              onMouseLeave={() => setShowPopover(false)}
            >
              Devices
              {showPopover && (
                <div className="absolute left-0 mt-2 bg-white text-black p-2 rounded shadow-lg z-10">
                  <a href="/devices" className="block px-4 py-2 hover:bg-gray-100">List of Devices</a>
                  <a href="/device-registration" className="block px-4 py-2 hover:bg-gray-100">Device Registration</a>
                </div>
              )}
            </div>
            <a href="/monitoring" className="inline-block p-2">Monitoring</a>
            {/* Update the logout link to call handleLogout on click */}
            <button onClick={handleLogout} className="inline-block p-2">Logout</button>
          </nav>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center h-screen bg-gray-200">
          {children}
      </main>
    </>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};