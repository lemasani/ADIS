import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

//layout
import HomeLayout from './Layout/HomeLayout'
// Pages
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import RootLayout from './Layout/RootLayout'
import Dashboard from './Pages/Dashboard'
import DeviceRegistration from './Pages/DeviceRegistration'
import Devices from './Pages/Devices'
import FarmMonitoring from './Pages/Monitoring'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<HomeLayout><Login /> </HomeLayout>} />
      <Route path="/register" element={<HomeLayout><Register /> </HomeLayout>} />

      <Route path='/dashboard' element={<RootLayout><Dashboard /></RootLayout>} />
      <Route path='/device-registration' element={<RootLayout><DeviceRegistration /></RootLayout>} />
      <Route path='/devices' element={<RootLayout><Devices /></RootLayout>} />
      <Route path='/monitoring' element={<RootLayout><FarmMonitoring /></RootLayout>} />

    </Route>
  )
)

function App() {
  return (
    // <Route>
    //     <Route exact path="/" component={Home} />
    //     <Route path="/register" component={Register} />
    // </Route>

    <RouterProvider router={router} />
  )
}

export default App