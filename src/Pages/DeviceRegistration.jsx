import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { submitDeviceRegistration } from '../Components/Endpoints';
import { useAuth } from '../Utils/useAuth';

export default function DeviceRegistration() {
    useAuth()
    const [registrationMessage, setRegistrationMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            name: '',
            ipAddress: '',
            sshPort: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            ipAddress: Yup.string().required('Required'),
            sshPort: Yup.number().required('Required').positive().integer(),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await submitDeviceRegistration(values);
                setRegistrationMessage('Device registration successful.');
                console.log('Device registration successful:', response);
                setRegistrationMessage('Device registration successful.');
                // Handle successful registration (e.g., redirect or display success message)
            } catch (error) {
                
                console.error('Device registration failed:', error);
                // Handle registration failure (e.g., display error message)
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="device-registration-container p-10">
            <h1 className="text-3xl font-bold text-center mb-8">Device Registration</h1>
            <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md">
                {registrationMessage && (
                    <div className="text-center mt-4">
                    {registrationMessage}
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="w-full p-2 border border-gray-400 rounded"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-xs">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="ipAddress">IP Address</label>
                    <input
                        id="ipAddress"
                        name="ipAddress"
                        type="text"
                        className="w-full p-2 border border-gray-400 rounded"
                        onChange={formik.handleChange}
                        value={formik.values.ipAddress}
                    />
                    {formik.touched.ipAddress && formik.errors.ipAddress ? (
                        <div>{formik.errors.ipAddress}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="sshPort">SSH Port</label>
                    <input
                    id="sshPort"
                    name="sshPort"
                    type="number"
                    className="w-full p-2 border border-gray-400 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.sshPort}
                    />
                    {formik.touched.sshPort && formik.errors.sshPort ? (
                    <div>{formik.errors.sshPort}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="username">Username</label>
                    <input
                    id="username"
                    name="username"
                    type="text"
                    className="w-full p-2 border border-gray-400 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    />
                    {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full p-2 border border-gray-400 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register Device</button>
            </form>
        </div>
    );
}