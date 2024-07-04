import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { submitRegistration } from '../Components/Endpoints';

export default function Register() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '', // Add initial value for phone
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Must be 8 characters or more').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'), // Validate phone number
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Use the submitRegistration function here
        const response = await submitRegistration(values);
        console.log('Registration successful:', response);
        navigate('/login')
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration failure (e.g., display error message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="register-container p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Register</h1>
      <form onSubmit={formik.handleSubmit} className="container mx-auto max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-400 rounded"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-400 rounded"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-bold mb-2">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full p-2 border border-gray-400 rounded"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div>{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-400 rounded"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full p-2 border border-gray-400 rounded"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
        <span className='text-center text-slate-400'>Already have an account <a href="/login" className='text-blue-400'>Login</a> here</span>
      </form>
    </div>
  );
}