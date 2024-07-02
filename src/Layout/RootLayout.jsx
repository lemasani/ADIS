import PropTypes from 'prop-types';

export default function RootLayout({ children }) {
    return (
      <>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">ADIS home</div>
            <nav>
              <a href="/dashboard" className="inline-block p-2">Dashboard</a>
              <a href="/device-registration" className="inline-block p-2">Device Registration</a>
              <a href="/monitoring" className="inline-block p-2">Monitoring</a>
              <a href="/logout" className="inline-block p-2">Logout</a> {/* Added logout button */}
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