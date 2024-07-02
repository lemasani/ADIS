

import heroBg from '../assets/heroBg.jpeg';

import { generateUUID } from '../Utils/UuidGenerator'

const uuid = generateUUID();
console.log(uuid);

export default function Home() {
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

        <main>
            <div className="relative">
                <img src={heroBg} alt="Drip Irrigation" className="w-full object-cover" />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold p-4">
                    Welcome to the Automated Drip Irrigation System
                    </h1>
                </div>
            </div>

            <section className="py-12 bg-gray-200">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-8">Services We Provide</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Watering Schedule</h3>
                        <p>Automate your irrigation schedules to optimize water usage and ensure your crops receive the right amount of water at the right time.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Sensor Monitoring</h3>
                        <p>Monitor soil moisture and weather conditions in real-time with our advanced sensor technology to make informed irrigation decisions.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Water Usage</h3>
                        <p>Track and analyze your water usage data to identify opportunities for conservation and cost savings.</p>
                    </div>
                    </div>
                </div>
        </section>
        </main>
    </>
    
  );
}