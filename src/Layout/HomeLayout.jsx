import PropTypes from 'prop-types';
// src/Layout/HomeLayout.jsx
export default function HomeLayout({ children }) {
    return (
      <>
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">ADIS home</div>
            <nav>
              <a href="/login" className="inline-block p-2">Login</a>
              <a href="/register" className="inline-block p-2">Register</a>
            </nav>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <div className=" bg-white">
            {children}
          </div>
        </main>
      </>
    )
  }


  HomeLayout.propTypes = {
    children: PropTypes.node.isRequired,
  };